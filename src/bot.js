const moment = require('moment-timezone');
const { validate } = require('./validator');
const { appendCandidate } = require('./sheets');
const { WELCOME, PROMPTS, ERRORS, SESSION_EXPIRED, CLOSING } = require('./messages');

const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000;

const sessions = new Map();

function getSession(phone) {
  return sessions.get(phone) || null;
}

function createSession(phone) {
  const session = { step: 1, data: {}, startedAt: Date.now() };
  sessions.set(phone, session);
  return session;
}

function clearSession(phone) {
  sessions.delete(phone);
}

function isExpired(session) {
  return Date.now() - session.startedAt > SESSION_TIMEOUT_MS;
}

function getStepKey(step) {
  const keys = {
    1: 'name', 2: 'email', 3: 'loginCode', 4: 'appPassword',
    5: 'contact', 6: 'availability', 7: 'shift', 8: 'cities',
    9: 'visa', 10: 'sin', 11: 'dob', 12: 'address',
    13: 'postalCode', 14: 'landingDate', 15: 'workedBefore',
    16: 'prevLocation', 17: 'workDateRange',
  };
  return keys[step];
}

function nextStep(session) {
  if (session.step === 15 && session.data.workedBefore === 'No') {
    return 'done';
  }
  if (session.step === 17) return 'done';
  return session.step + 1;
}

async function handleMessage(phone, text) {
  const input = text.trim();

  let session = getSession(phone);

  if (input.toLowerCase() === 'restart' || input.toLowerCase() === 'start over') {
    clearSession(phone);
    const newSession = createSession(phone);
    return `${WELCOME}\n\n${PROMPTS[1]}`;
  }

  if (!session) {
    const newSession = createSession(phone);
    return `${WELCOME}\n\n${PROMPTS[1]}`;
  }

  if (isExpired(session)) {
    clearSession(phone);
    return SESSION_EXPIRED;
  }

  session.startedAt = Date.now();

  const result = validate(session.step, input);

  if (result === null) {
    return `${ERRORS[session.step]}\n\n${PROMPTS[session.step]}`;
  }

  session.data[getStepKey(session.step)] = result;

  const next = nextStep(session);

  if (next === 'done') {
    session.data.whatsappNumber = phone;
    session.data.submittedAt = moment().tz('America/Toronto').format('YYYY-MM-DD HH:mm:ss');

    try {
      await appendCandidate(session.data);
    } catch (err) {
      console.error('Sheets error:', err.message);
    }

    clearSession(phone);
    return CLOSING;
  }

  session.step = next;
  return PROMPTS[next];
}

module.exports = { handleMessage };
