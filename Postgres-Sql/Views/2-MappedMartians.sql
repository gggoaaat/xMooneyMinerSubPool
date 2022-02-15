-- View: MinerData.LatestWorkers

-- DROP VIEW "MinerData"."LatestWorkers";

CREATE OR REPLACE VIEW "MinerData"."LatestWorkers"
 AS
 SELECT "Worker_Log".worker,
    max("Worker_Log"."reportedHashrate") / 1000000::double precision AS "reportedHashrate",
    max("Worker_Log"."currentHashrate") / 1000000::double precision AS "currentHashrate",
    max("Worker_Log"."validShares") AS "validShares",
    max("Worker_Log"."invalidShares") AS "invalidShares",
    max("Worker_Log"."staleShares") AS "staleShares",
    max("Worker_Log"."entryDate") AS "entryDate"
   FROM "MinerData"."Worker_Log"
  WHERE "Worker_Log"."entryDate" > (now() - '1 day'::interval)
  GROUP BY "Worker_Log".worker
  ORDER BY "Worker_Log".worker;

ALTER TABLE "MinerData"."LatestWorkers"
    OWNER TO mooney;

