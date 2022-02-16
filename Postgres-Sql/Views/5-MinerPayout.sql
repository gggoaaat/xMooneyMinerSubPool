-- View: MinerData.MinerPayout

-- DROP VIEW "MinerData"."MinerPayout";

CREATE OR REPLACE VIEW "MinerData"."MinerPayout"
 AS
 SELECT "Payout_Log"."ID",
    "Payout_Log"."SnapTime",
    "Payout_Log"."Algo",
    "Payout_Log".start,
    "Payout_Log"."end",
    "Payout_Log".amount,
    "Payout_Log".amount::numeric / '1000000000000000000'::numeric AS "Eth",
    "Payout_Log"."txHash",
    "Payout_Log"."paidOn"
   FROM "MinerData"."Payout_Log";

ALTER TABLE "MinerData"."MinerPayout"
    OWNER TO mooney;

