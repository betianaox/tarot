const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// package exports desactivado: con `true` (como venía de Runas), Metro no
// resuelve las fuentes .ttf de @expo/vector-icons (Unable to resolve
// MaterialCommunityIcons.ttf). La resolución clásica que usan los íconos anda bien.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
