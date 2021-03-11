#!/bin/sh

rm *.sha256
sha256sum out/make/deb/x64/collektor_*.deb > $(/bin/ls out/make/deb/x64/).sha256
sha256sum out/make/rpm/x64/collektor-*.rpm > $(/bin/ls out/make/rpm/x64/).sha256
sha256sum out/make/zip/linux/x64/collektor-*.zip > $(/bin/ls out/make/zip/linux/x64/).sha256