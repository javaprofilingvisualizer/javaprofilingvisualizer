# Profiling Modes

JPV supports two acquisition modes, unified by the same intermediate JSON schema and the same [time formula](/methodology/temporal-weighting).

## JMH mode

For micro-benchmarks built on the [Java Microbenchmark Harness](https://github.com/openjdk/jmh).

```bash
java -jar target/benchmarks.jar <Benchmark> \
  -f 1 -wi 3 -i 5 \
  -bm avgt -tu ms \
  -p param=value \
  -jvmArgs "-agentpath:libasyncProfiler.so=start,event=wall,file=v${TAG}.jfr" \
  -rf json -rff v${TAG}.json
```

**`T` acquisition:** `primaryMetric.score` from the JSON result saved with `-rf json`. `-bm avgt -tu ms` forces the score into **ms/op** regardless of how the benchmark itself was annotated.

## Standalone mode 

For any Java program that is not a JMH benchmark — services, batch jobs, macro-benchmarks under external load.

```bash
/usr/bin/time -f "%e" \
java -agentpath:libasyncProfiler.so=start,event=wall,file=v${TAG}.jfr \
     -jar app.jar --operations ${N_OPS}
```

**`T` acquisition:** total elapsed time divided by the operation count `N_OPS`. The workload must therefore be **fixed-load** (a known number of operations), not fixed-duration.


### Running application

async-profiler can also attach to an already-running JVM by PID, using the `asprof` launcher:

```bash
asprof start -e wall -f profile.jfr <pid>  
# ... exercise the application ...
asprof stop <pid>                        
```
