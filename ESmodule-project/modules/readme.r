ES Modules & Modular Architecture
import / export in JavaScript

Before ES Modules:
    - All JavaScript in ONE giant file
    - 10,000+ lines in one file
    - Hard to find bugs
    - Hard to work in teams
    - Code cannot be reused

Solution: Split code into separate files
Each file = one module = one responsibility

ES Modules = ECMAScript Modules

Two keywords control everything:
    EXPORT → "I am sharing this from my file"
    IMPORT → "I am bringing this from another file"

Simple rule:
- If you want others to use it → export it
- If you need something from another file → import it

⭐Import With Alias
    javascript
    // Rename on import to avoid conflicts
    import { add as addNumbers } from './math.js';
    import { add as addStrings } from './strings.js';

    console.log(addNumbers(1, 2));    // 3
    console.log(addStrings("a","b")); // ab

Import Everything
javascript
// Import entire module as one object
import * as  from 'path';

 👑👑👑👑5 Benefits of ES Modules:

1. ORGANIZATION
   Each file has one clear purpose
   Easy to find and fix code

2. REUSABILITY  
   Write once, use anywhere
   No copy pasting

3. MAINTAINABILITY
   Change one module without breaking others
   Easier debugging

4. COLLABORATION
   Team members work on separate files
   No conflicts

5. PERFORMANCE
   Browser loads only what is needed
   Faster applications