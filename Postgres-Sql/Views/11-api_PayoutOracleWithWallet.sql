-- View: MinerData.api_PayoutOracleWithWallet

-- DROP VIEW "MinerData"."api_PayoutOracleWithWallet";

CREATE OR REPLACE VIEW "MinerData"."api_PayoutOracleWithWallet"
 AS
 SELECT a."PayOutID",
    b."Martian",
    a."Miner",
    b."WalletAddress",
    count(*) AS "Total Workers",
    sum(a."Time Available") / count(*)::numeric AS "Time Available",
    sum(a."Payout Avg currentHashrate") || ' MH'::text AS "Mining Period Avg Hashrate",
    sum(a."Period Shares") AS "Mining Period Shares",
    sum(a."Avg Valid reportedHashrate") || ' MH'::text AS "Period Reported Hashrate Avg",
    sum(a."Avg Valid currentHashrate") || ' MH'::text AS "Period Current Hashrate Avg",
    a."Pool Period Mined Amount",
    sum(a."My Period Share") AS "Worker Mining Period Share",
    sum(a."Successful Pulse") AS "Successful Pulse",
    a.processed
   FROM "MinerData"."api_PayoutOracleWithShares" a
     LEFT JOIN "MinerData"."Miners" b ON a."Miner"::text = b."Handle"::text
  GROUP BY a."PayOutID", b."WalletAddress", a."Miner", b."Martian", a."Total Pulse", a."Period Pool Total Shares", a."Pool Period Mined Amount", a.processed;

ALTER TABLE "MinerData"."api_PayoutOracleWithWallet"
    OWNER TO mooney;

