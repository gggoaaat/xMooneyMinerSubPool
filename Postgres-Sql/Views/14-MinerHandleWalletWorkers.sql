-- View: MinerData.MinerHandleWalletWorkers

-- DROP VIEW "MinerData"."MinerHandleWalletWorkers";

CREATE OR REPLACE VIEW "MinerData"."MinerHandleWalletWorkers"
 AS
 SELECT a."Handle",
    a."WalletAddress",
    b."ID",
    b."Miner",
    b.worker
   FROM "MinerData"."Miners" a
     FULL JOIN "MinerData"."MinersAndWokers" b ON a."Handle"::text = b."Miner"::text;

ALTER TABLE "MinerData"."MinerHandleWalletWorkers"
    OWNER TO mooney;

