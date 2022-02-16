-- View: MinerData.api_Payout

-- DROP VIEW "MinerData"."api_Payout";

CREATE OR REPLACE VIEW "MinerData"."api_Payout"
 AS
 SELECT a."PayOutID",
    a."Miner",
    a."Martian",
    a."WalletAddress",
    round(a."Pool Period Mined Amount" * a."Worker Mining Period Share", 9) AS "Ethereum Mined",
    (a."Pool Period Mined Amount" * a."Worker Mining Period Share")::double precision * b."OneEthToMooney" AS "Mooney Earned",
    (a."Pool Period Mined Amount" * a."Worker Mining Period Share")::double precision * b."OneEthToMooney" * 1.0777::double precision AS "Mooney Bonus",
    (a."Pool Period Mined Amount" * a."Worker Mining Period Share")::double precision * b."OneEthToMooney" * 1.0777::double precision * 1.111111111110999::double precision AS "Mooney Earned w Reflections",
    a."Mining Period Avg Hashrate",
    a."Period Reported Hashrate Avg",
    a."Period Current Hashrate Avg",
    a."Mining Period Shares",
    a."Worker Mining Period Share",
    a."Pool Period Mined Amount",
    a."Successful Pulse",
    a.processed,
    a."Total Workers",
    a."Time Available"
   FROM "MinerData"."api_PayoutOracleWithWallet" a
     JOIN "MinerData"."Payout_Log" b ON a."PayOutID" = b."ID"
  ORDER BY a."Miner";

ALTER TABLE "MinerData"."api_Payout"
    OWNER TO mooney;

