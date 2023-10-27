/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * @file
 * 
 * This benchmark measures the performance impact of dirty-checking values
 * before calling setAttribute().
 * 
 * It measures three techniques:
 * - always call setAttribute (no dirty-check)
 * - dirty check against the DOM (getAttribute)
 * - dirty check against a JS value
 */

const benchmark = new URL(window.location.href).searchParams.get('benchmark');
const iterations = 1000;

const el = document.createElement('div');
document.body.appendChild(el);

/**
 * Returns 'one' or 'two' based on `i` in an AABB pattern.
 * 
 * This is so we can test dirty checking in the cases where the new value is
 * equal to the old value, and where it isn't.
 */
const getValue = (i: number) => (i & 2) === 0 ? 'one' : 'two';

performance.mark('start');
if (benchmark === 'always-set') {
  // The version naively sets the attribute with no dirty-checking 
  for (let i = 0; i < iterations; i++) {
    const value = getValue(i);
    el.setAttribute('foo', value);  
  }
} else if (benchmark === 'check-set') {
  // The version dirty-checks against the live DOM value
  for (let i = 0; i < iterations; i++) {
    const value = getValue(i);
    const oldValue = el.getAttribute('foo');
    if (value !== oldValue) {
      el.setAttribute('foo', value);
    }
  }
} else if (benchmark === 'dirty-check') {
  // The version dirty-checks against a stored JS value
  let oldValue;
  for (let i = 0; i < iterations; i++) {
    const value = getValue(i);
    if (value !== oldValue) {
      el.setAttribute('foo', value);
      oldValue = value;
    }
  }
}
performance.measure('result', 'start');

export {}
