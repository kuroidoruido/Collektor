rm -rf target/runtime-image

$JAVA_HOME/bin/jlink \
  --add-modules java.base,java.compiler,java.instrument,java.naming,java.rmi,java.security.jgss,java.security.sasl,java.sql,jdk.jconsole,jdk.unsupported \
  --compress 2 --no-header-files --no-man-pages \
  --output target/runtime-image

# ./target/runtime-image/bin/java -Xshare:dump

# mkdir -p target/runtime-image/cds

# ./target/runtime-image/bin/java \
#   -XX:ArchiveClassesAtExit=target/runtime-image/cds/app-cds.jsa \
#   --enable-preview \
#   -jar target/collektor-1.0.0-SNAPSHOT-runner.jar \
# & (sleep 5 && exit 0)



