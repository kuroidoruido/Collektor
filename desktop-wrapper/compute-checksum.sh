#!/bin/sh

sha256sum out/make/deb/x64/collektor_*_amd64.deb > $(/bin/ls out/make/deb/x64/).sha256
sha256sum out/make/rpm/x64/collektor_*_amd64.rpm > $(/bin/ls out/make/rpm/x64/).sha256
sha256sum out/make/zip/x64/collektor_*_amd64.zip > $(/bin/ls out/make/zip/x64/).sha256