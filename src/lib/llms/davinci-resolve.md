# DaVinci Resolve on BlossomOS

DaVinci Resolve runs on BlossomOS as a Flatpak, with both the Free and Studio editions supported.

- Arc Compat runs in the background and notifies you when a media file uses a codec DaVinci Resolve on Linux can't import.
- The bundled `convert-for-resolve` command only re-encodes what's actually incompatible: DNxHD, DNxHR, and ProRes video, and PCM audio, pass through untouched.
- Free edition has no H.264/H.265 decoding. Studio edition needs GPU acceleration for H.264/H.265 decoding, AMD users need the `rocm-meta` package, unavailable on older pre-RDNA cards.
- AAC audio import isn't supported in either edition. H.264/H.265 export needs an Nvidia GPU with CUDA (`cuda-devel`).
