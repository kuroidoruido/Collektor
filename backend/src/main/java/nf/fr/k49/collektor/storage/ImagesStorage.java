package nf.fr.k49.collektor.storage;

import java.io.File;
import java.io.InputStream;
import java.util.Optional;

import nf.fr.k49.collektor.model.ImageInfo;

public interface ImagesStorage {
    public Optional<File> getImage(String imageId);
    public Optional<Boolean> deleteImage(String imageId);
    public Optional<ImageInfo> createImage(InputStream fileInputStream, String filename);
}
