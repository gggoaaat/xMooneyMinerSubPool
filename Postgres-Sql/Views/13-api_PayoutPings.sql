-- View: MinerData.api_PayoutPings

-- DROP VIEW "MinerData"."api_PayoutPings";

CREATE OR REPLACE VIEW "MinerData"."api_PayoutPings"
 AS
 SELECT c."PayOutID",
    count(*) AS "Pings",
    c."Mined From",
    c."Mined To"
   FROM ( SELECT a."PayOutID",
            a."SnapTime",
            a."Algo",
            a.amount / '1000000000000000000'::numeric AS amount,
            to_timestamp(a."paidPrevious"::bigint::double precision)::timestamp without time zone AS "Mined From",
            to_timestamp(a."paidOn"::bigint::double precision)::timestamp without time zone AS "Mined To",
            a."PayOutProcessed",
            a."PayOutDate",
            a."EthRatioAtPayout",
            a."OneEthToMooney",
            a."EthRatioToBNB",
            a."OneEthToBNB",
            a."txHash",
            b."ID"
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
                    b_1."entryDate"
                   FROM "MinerData"."Worker_Log" b_1) b ON b."time" >= a."paidPrevious"::bigint AND b."time" < a."paidOn"::bigint) c
  GROUP BY c."PayOutID", c."Mined From", c."Mined To"
  ORDER BY c."PayOutID" DESC;

ALTER TABLE "MinerData"."api_PayoutPings"
    OWNER TO mooney;

