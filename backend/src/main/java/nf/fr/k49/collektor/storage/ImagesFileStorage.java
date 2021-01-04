package nf.fr.k49.collektor.storage;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

import javax.inject.Singleton;

import nf.fr.k49.collektor.AppConfig;

@Singleton
public class ImagesFileStorage implements ImagesStorage {
    private static final String IMG_DIR_NAME = "imgs";

    AppConfig config;

    public ImagesFileStorage(AppConfig config) {
        this.config = config;
    }

    public Optional<File> getImage(String imageId) {
        var imgDirPath = Paths.get(this.config.baseDir, IMG_DIR_NAME);
        var imgDir = imgDirPath.toFile();
        var fileNames = imgDir.list((File dir, String name) -> name != null && name.startsWith(imageId));
        if (fileNames != null && fileNames.length >= 1) {
            return Optional.ofNullable(Paths.get(imgDirPath.toString(), fileNames[0]).toFile()); 
        }
        return Optional.empty();
    }
}
