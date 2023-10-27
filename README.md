# Lit platform benchmarks

This repo contains a set of micro-benchmarks of basic platform APIs.

The benchmarks are useful to measure the performance fundamental operations across different DOM and JavaScript techniques and different browsers.

## Benchmarks

### dirty-check-attributes

This benchmark measures the performance impact of dirty-checking values before calling `setAttribute()``.
 
It measures three techniques:
- always call `setAttribute()`` (no dirty-check)
- dirty check against the DOM (with `getAttribute()`)
- dirty check against a stored JS value

```sh
npm run bench:dirty-check-attributes
```

### dirty-check-text-content

This benchmark measures the performance impact of dirty-checking values
before setting `Text.textContent`.

It measures three techniques:
- always call `textContent` (no dirty-check)
- dirty check against the DOM
- dirty check against a stored JS value

## Future benchmarks
- Setting `.textContent` vs `.data`
- `append()` vs `insertBefore()`
- `template.innerHTML` vs `DOMParser`
- template clone vs imperative DOM construction
- Reusing TreeWalkers
- Finding nodes with TreeWalker + comments vs query selectors, etc

