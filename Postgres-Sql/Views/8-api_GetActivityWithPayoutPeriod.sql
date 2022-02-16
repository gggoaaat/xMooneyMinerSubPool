-- View: MinerData.api_GetActivityWithPayoutPeriod

-- DROP VIEW "MinerData"."api_GetActivityWithPayoutPeriod";

CREATE OR REPLACE VIEW "MinerData"."api_GetActivityWithPayoutPeriod"
 AS
 SELECT a."PayOutID",
    b."ID",
    b.worker,
    b."time",
    b."Mined From",
    b."lastSeen",
    b."reportedHashrate",
    b."currentHashrate",
    b."validShares",
    b."invalidShares",
    b."staleShares",
    b."entryDate",
    a."SnapTime",
    a."Algo",
    a.amount,
    to_timestamp(a."paidPrevious"::bigint::double precision)::timestamp without time zone AS "Mined From 2",
    to_timestamp(a."paidOn"::bigint::double precision)::timestamp without time zone AS "Mined To 2",
    a."PayOutProcessed" AS processed
   FROM "MinerData"."api_PayoutDates" a
     JOIN ( SELECT b_1."ID",
            b_1.worker,
            b_1."time",
            to_timestamp(b_1."time"::double precision)::timestamp without time zone AS "Mined From",
            b_1."lastSeen",
            b_1."reportedHashrate",
            b_1."currentHashrate",
            b_1."validShares",
            b_1."invalidShares",
            b_1."staleShares",
            b_1."entryDate",
            b_1.processed
           FROM "MinerData"."Worker_Log" b_1) b ON b."time" >= a."paidPrevious"::bigint AND b."time" < a."paidOn"::bigint
  ORDER BY b."ID" DESC;

ALTER TABLE "MinerData"."api_GetActivityWithPayoutPeriod"
    OWNER TO mooney;

