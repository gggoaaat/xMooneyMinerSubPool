-- View: MinerData.api_PayoutOracle

-- DROP VIEW "MinerData"."api_PayoutOracle";

CREATE OR REPLACE VIEW "MinerData"."api_PayoutOracle"
 AS
 SELECT a."PayOutID",
    a."Miner",
    round((a."Total Valid currentHashrate" / a."Total Pulse"::double precision / 1000000::double precision)::numeric, 2) AS "Payout Avg currentHashrate",
    round(a."Successful Pulse"::numeric * 100::numeric / a."Total Pulse"::numeric, 2) AS "Time Available",
    a."Total Valid Shares" * 1::numeric / a."Total Pulse"::numeric AS "Period Shares",
    a."Pool Period Mined Amount",
    a."Successful Pulse",
    a."Total Pulse",
    a."Total Valid reportedHashrate",
    round((a."Avg Valid reportedHashrate" / 1000000::double precision)::numeric, 2) AS "Avg Valid reportedHashrate",
    a."Total Valid currentHashrate",
    round((a."Avg Valid currentHashrate" / 1000000::double precision)::numeric, 2) AS "Avg Valid currentHashrate",
    a."Total Valid Shares",
    a."Avg Valid Shares",
    a."Total staleShares",
    a."Avg Valid staleShares",
    a."Total Valid invalidShares",
    a."Avg Valid invalidShares",
    a.worker,
    b."Martian",
    a.processed
   FROM ( SELECT b_1."Miner",
            a_1.worker,
            a_1.amount AS "Pool Period Mined Amount",
            a_1."PayOutID",
            count(*) AS "Successful Pulse",
            ( SELECT count(*) AS count
                   FROM "MinerData"."api_GetActivityWithPayoutPeriod"
                  WHERE "api_GetActivityWithPayoutPeriod"."PayOutID" = a_1."PayOutID"
                  GROUP BY "api_GetActivityWithPayoutPeriod"."PayOutID", "api_GetActivityWithPayoutPeriod".worker
                  ORDER BY (count(*)) DESC
                 LIMIT 1) AS "Total Pulse",
            sum(a_1."reportedHashrate") AS "Total Valid reportedHashrate",
            avg(a_1."reportedHashrate") AS "Avg Valid reportedHashrate",
            sum(a_1."currentHashrate") AS "Total Valid currentHashrate",
            avg(a_1."currentHashrate") AS "Avg Valid currentHashrate",
            sum(a_1."validShares") AS "Total Valid Shares",
            avg(a_1."validShares") AS "Avg Valid Shares",
            sum(a_1."invalidShares") AS "Total Valid invalidShares",
            avg(a_1."invalidShares") AS "Avg Valid invalidShares",
            sum(a_1."staleShares") AS "Total staleShares",
            avg(a_1."staleShares") AS "Avg Valid staleShares",
            a_1.processed
           FROM "MinerData"."api_GetActivityWithPayoutPeriod" a_1
             FULL JOIN "MinerData"."MinersAndWokers" b_1 ON a_1.worker::text = b_1.worker::text
          GROUP BY b_1."Miner", a_1."PayOutID", a_1.worker, a_1.amount, a_1.processed) a
     JOIN "MinerData"."Miners" b ON a."Miner"::text = b."Handle"::text;

ALTER TABLE "MinerData"."api_PayoutOracle"
    OWNER TO mooney;

