/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * @file
 * 
 * This benchmark measures the performance impact of dirty-checking values
 * before calling Text.textContent.
 * 
 * It measures three techniques:
 * - always call textContent (no dirty-check)
 * - dirty check against the DOM
 * - dirty check against a JS value
 */

const benchmark = new URL(window.location.href).searchParams.get('benchmark');
const iterations = 1000;

const container = document.createElement('div');
document.body.appendChild(container);

const el = document.createTextNode('');
container.appendChild(el);

const one = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const two = `Odio aenean sed adipiscing diam. Pretium viverra suspendisse
potenti nullam ac tortor vitae purus faucibus. Ac feugiat sed lectus vestibulum
mattis ullamcorper. Integer feugiat scelerisque varius morbi. Leo duis ut diam
quam nulla porttitor massa id neque. Consequat ac felis donec et odio
pellentesque diam. Lacus vestibulum sed arcu non odio. Convallis posuere morbi
leo urna molestie. Non pulvinar neque laoreet suspendisse interdum consectetur.
Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit
adipiscing bibendum est ultricies integer quis.`

/**
 * Returns one or two based on `i` in an AABB pattern.
 * 
 * This is so we can test dirty checking in the cases where the new value is
 * equal to the old value, and where it isn't.
 */
const getValue = (i: number) => (i & 2) === 0 ? one : two;

performance.mark('start');
if (benchmark === 'always-set') {
  for (let i = 0; i < iterations; i++) {
    const value = getValue(i);
    el.textContent = value;
  }
} else if (benchmark === 'check-set') {
  for (let i = 0; i < iterations; i++) {
    const value = getValue(i);
    if (value !== el.textContent) {
      el.textContent = value;
    }
  }
} else if (benchmark === 'dirty-check') {
  let oldValue;
  for (let i = 0; i < iterations; i++) {
    const value = getValue(i);
    if (value !== oldValue) {
      el.textContent = value;
      oldValue = value;
    }
  }
}
performance.measure('result', 'start');

export {}
