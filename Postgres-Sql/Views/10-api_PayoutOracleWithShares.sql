-- View: MinerData.api_PayoutOracleWithShares

-- DROP VIEW "MinerData"."api_PayoutOracleWithShares";

CREATE OR REPLACE VIEW "MinerData"."api_PayoutOracleWithShares"
 AS
 SELECT a."PayOutID",
    a."Martian",
    a."Miner",
    a.worker,
    a."Payout Avg currentHashrate",
    a."Time Available",
    a."Period Shares",
    b."Period Pool Total Shares",
    a."Period Shares" / b."Period Pool Total Shares" AS "My Period Share",
    a."Pool Period Mined Amount",
    a."Successful Pulse",
    a."Total Pulse",
    a."Total Valid reportedHashrate",
    a."Avg Valid reportedHashrate",
    a."Total Valid currentHashrate",
    a."Avg Valid currentHashrate",
    a."Total Valid Shares",
    a."Avg Valid Shares",
    a."Total staleShares",
    a."Avg Valid staleShares",
    a."Total Valid invalidShares",
    a."Avg Valid invalidShares",
    a.processed
   FROM "MinerData"."api_PayoutOracle" a
     LEFT JOIN ( SELECT sum(c."Period Shares") AS "Period Pool Total Shares",
            c."PayOutID"
           FROM "MinerData"."api_PayoutOracle" c
          GROUP BY c."PayOutID") b ON a."PayOutID" = b."PayOutID";

ALTER TABLE "MinerData"."api_PayoutOracleWithShares"
    OWNER TO mooney;

