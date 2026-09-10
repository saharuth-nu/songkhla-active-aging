# DESIGN.md Lint Baseline

Tool: `@google/design.md@0.4.0`  
Command: `npm run lint:design`  
Accepted baseline: 0 errors, 62 warnings, 1 info

## Normalization applied

`components.modal.elevation` originally referenced `{elevation.modal}`. The current alpha schema does not recognize `elevation` as a resolvable token group, so the linter reported one error. The reference was replaced with its exact approved literal value, `0 20px 60px rgba(23, 50, 74, 0.18)`. No rendered design value changed.

## Warning policy

The remaining warnings describe limitations or findings in the alpha schema rather than permission to alter the approved design:

- component properties such as borders, minimum heights, backdrop blur, and elevation are not yet recognized sub-tokens;
- `motion` and `layout` are retained because the schema does not yet export those token groups;
- intentionally available brand and data-visualization colors may be reported as orphaned;
- contrast findings refer to the original brand-oriented component references in `DESIGN.md`.

The runtime implementation follows the accessibility resolution frozen in `IMPLEMENTATION_CONTRACT.md`: normal interactive text and controls use action blue `#2E72AA`, while sea blue `#3D8ED0` remains a brand/decorative color.

Any new lint error blocks implementation. A warning-count change requires review against Hi-fi v0.1.0 and this baseline; warnings must not be removed by deleting approved design information.
