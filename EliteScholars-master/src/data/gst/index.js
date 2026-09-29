import { GST_QB_GST_ENGLISH } from './questions/gst_english';
import { GST_QB_GST_LOGIC } from './questions/gst_logic';
import { GST_QB_GST_NIGERIAN } from './questions/gst_nigerian';
import { GST_QB_GST_HISTORY } from './questions/gst_history';
import { GST_QB_GST_COMPUTING } from './questions/gst_computing';
import { GST_QB_GST_ENTREPRENEURSHIP } from './questions/gst_entrepreneurship';
import { GST_QB_GST_PEACE } from './questions/gst_peace';
import { GST_QB_GST_COMMUNICATION } from './questions/gst_communication';
import { GST_QB_GST_ENVIRONMENT } from './questions/gst_environment';

import { GST_LEARN_GST_ENGLISH } from './learn/gst_english';
import { GST_LEARN_GST_LOGIC } from './learn/gst_logic';
import { GST_LEARN_GST_NIGERIAN } from './learn/gst_nigerian';
import { GST_LEARN_GST_HISTORY } from './learn/gst_history';
import { GST_LEARN_GST_COMPUTING } from './learn/gst_computing';
import { GST_LEARN_GST_ENTREPRENEURSHIP } from './learn/gst_entrepreneurship';
import { GST_LEARN_GST_PEACE } from './learn/gst_peace';
import { GST_LEARN_GST_COMMUNICATION } from './learn/gst_communication';
import { GST_LEARN_GST_ENVIRONMENT } from './learn/gst_environment';

export const GST_SUBJECTS = [
  { id: 'gst_english',          label: 'Use of English',                    icon: '📝', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'gst_logic',            label: 'Logic & Critical Thinking',         icon: '🧠', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'gst_nigerian',         label: 'Nigerian Peoples & Culture',        icon: '🇳🇬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'gst_history',          label: 'History & Philosophy of Science',   icon: '🔭', color: '#B45309', bg: '#FEF3C7' },
  { id: 'gst_compute',          label: 'Introduction to Computing',         icon: '💻', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'gst_entrepreneurship', label: 'Entrepreneurship',                  icon: '🚀', color: '#DC2626', bg: '#FEE2E2' },
  { id: 'gst_peace',            label: 'Peace Studies & Conflict Resolution', icon: '🕊️', color: '#0891B2', bg: '#CFFAFE' },
  { id: 'gst_communication',    label: 'Communication Skills',              icon: '🗣️', color: '#9333EA', bg: '#F3E8FF' },
  { id: 'gst_environment',      label: 'Environmental Education',           icon: '🌿', color: '#16A34A', bg: '#DCFCE7' },
];

export const GST_QB = {
  gst_english:          GST_QB_GST_ENGLISH,
  gst_logic:            GST_QB_GST_LOGIC,
  gst_nigerian:         GST_QB_GST_NIGERIAN,
  gst_history:          GST_QB_GST_HISTORY,
  gst_compute:          GST_QB_GST_COMPUTING,
  gst_entrepreneurship: GST_QB_GST_ENTREPRENEURSHIP,
  gst_peace:            GST_QB_GST_PEACE,
  gst_communication:    GST_QB_GST_COMMUNICATION,
  gst_environment:      GST_QB_GST_ENVIRONMENT,
};

export const GST_LEARN = {
  gst_english:          GST_LEARN_GST_ENGLISH,
  gst_logic:            GST_LEARN_GST_LOGIC,
  gst_nigerian:         GST_LEARN_GST_NIGERIAN,
  gst_history:          GST_LEARN_GST_HISTORY,
  gst_compute:          GST_LEARN_GST_COMPUTING,
  gst_entrepreneurship: GST_LEARN_GST_ENTREPRENEURSHIP,
  gst_peace:            GST_LEARN_GST_PEACE,
  gst_communication:    GST_LEARN_GST_COMMUNICATION,
  gst_environment:      GST_LEARN_GST_ENVIRONMENT,
};
