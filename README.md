# JSON Beautifier Safari Extension

A simple JSON formatter extension for Safari that automatically makes JSON data readable.

## Installation Requirements

1. Xcode 15.0 or later
2. macOS 10.14 or later
3. iOS 15.0 or later (for iOS version)

## Developer Setup

1. Clone the project:
```
git clone https://github.com/theshiver/safari-json-beautifier-extension.git
```

2. Set up your Development Team ID:
   - Open the project in Xcode
   - Configure signing for both targets (iOS and macOS):
     - Json Beautifier (iOS)
     - Json Beautifier (macOS)
     - Json Beautifier Extension (iOS)
     - Json Beautifier Extension (macOS)

3. Update Bundle Identifier:
   - Replace the bundle identifier in `ViewController.swift` with your own bundle identifier
   - Update bundle identifiers for all targets with your own bundle identifier

## License

MIT
