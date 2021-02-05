package nf.fr.k49.collektor;

import javax.inject.Singleton;

import org.eclipse.microprofile.config.inject.ConfigProperty;

@Singleton
public class AppConfig {

    @ConfigProperty(name = "collektor.base-dir", defaultValue = "./data")
    String baseDir;
    private String finalBaseDir;

    public String getBaseDir() {
        if (this.finalBaseDir == null) {
            this.finalBaseDir = this.baseDir
                .replace("$USER", this.getUserHome())
                .replace("$DEVDIR", this.getDevDirectory());
        }
        return this.finalBaseDir;
    }
    
    public String getUserHome() {
        return System.getProperty("user.home");
    }
    
    private String getDevDirectory() {
        return System.getProperty("maven.multiModuleProjectDirectory","");
    }
}
