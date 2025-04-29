#!/bin/bash

# Clean the dist folder
rimraf dist

# Run the TypeScript initialization script
npx tsx scripts/index.ts

# Bundle the project using tsup
tsup

# Clean up unnecessary files
rimraf temp-banner.txt
rimraf dist/*.d.cts
 