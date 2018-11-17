/**
 * cdigit
 *
 * @copyright 2018 LiosK
 * @license Apache-2.0
 */

// Popular generic algorithms
export { default as luhn } from './algo/luhn';
export { default as verhoeff } from './algo/verhoeff';
export { default as damm } from './algo/damm';

// ISO/IEC 7064:2003, Pure systems
export { default as mod11_2 } from './algo/mod11_2';
export { default as mod37_2 } from './algo/mod37_2';
export { default as mod97_10 } from './algo/mod97_10';
export { default as mod661_26 } from './algo/mod661_26';
export { default as mod1271_36 } from './algo/mod1271_36';

// ISO/IEC 7064:2003, Hybrid systems
export { default as mod11_10 } from './algo/mod11_10';
export { default as mod27_26 } from './algo/mod27_26';
export { default as mod37_36 } from './algo/mod37_36';
