-- View: MinerData.MinerSummary_View

-- DROP VIEW "MinerData"."MinerSummary_View";

CREATE OR REPLACE VIEW "MinerData"."MinerSummary_View"
 AS
 SELECT "Worker_Log".worker,
    avg("Worker_Log"."validShares") AS "Average Shares",
    count(*) AS "Presence Count",
    ( SELECT count(*) AS count
           FROM "MinerData"."Worker_Log" "Worker_Log_1") AS "Total Captures",
    to_timestamp(min("Worker_Log"."time")::double precision)::date AS "First Ping",
    to_timestamp(max("Worker_Log"."time")::double precision)::date AS "Last Ping",
    min("Worker_Log"."time") AS "First Epic",
    max("Worker_Log"."time") AS "Last Epic"
   FROM "MinerData"."Worker_Log"
  GROUP BY "Worker_Log".worker
  ORDER BY "Worker_Log".worker;

ALTER TABLE "MinerData"."MinerSummary_View"
    OWNER TO mooney;

