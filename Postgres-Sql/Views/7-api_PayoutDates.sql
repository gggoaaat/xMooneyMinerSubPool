-- View: MinerData.api_PayoutDates

-- DROP VIEW "MinerData"."api_PayoutDates";

CREATE OR REPLACE VIEW "MinerData"."api_PayoutDates"
 AS
 SELECT a."ID" AS "PayOutID",
    a."SnapTime",
    a."Algo",
    a.start AS "Start Block",
    a."end" AS "End Block",
    a.amount::numeric / '1000000000000000000'::numeric AS amount,
    a."paidPrevious",
    a."paidOn",
    to_timestamp(a."paidPrevious"::bigint::double precision)::timestamp without time zone AS "Mined From",
    to_timestamp(a."paidOn"::bigint::double precision)::timestamp without time zone AS "Mined To",
    a."PayOutProcessed",
    a."PayOutDate",
    a."EthRatioAtPayout",
    a."OneEthToMooney",
    a."EthRatioToBNB",
    a."OneEthToBNB",
    a."txHash"
   FROM "MinerData"."Payout_Log" a
UNION ALL
 SELECT '9999999999999'::bigint AS "PayOutID",
    now()::character varying AS "SnapTime",
    'Ethash'::character varying AS "Algo",
    0 AS "Start Block",
    0 AS "End Block",
    0 AS amount,
    ( SELECT a."paidOn"
           FROM "MinerData"."Payout_Log" a
          ORDER BY a."ID" DESC
         LIMIT 1) AS "paidPrevious",
    date_part('epoch'::text, now() + '30 days'::interval)::bigint::character varying AS "paidOn",
    ( SELECT to_timestamp("Payout_Log"."paidOn"::bigint::double precision)::timestamp without time zone AS max
           FROM "MinerData"."Payout_Log"
          ORDER BY "Payout_Log"."ID" DESC
         LIMIT 1) AS "Mined From",
    now() AS "Mined To",
    false AS "PayOutProcessed",
    now() AS "PayOutDate",
    ' '::character varying AS "EthRatioAtPayout",
    1 AS "OneEthToMooney",
    ' '::character varying AS "EthRatioToBNB",
    1 AS "OneEthToBNB",
    ' '::character varying AS "txHash"
  ORDER BY 1 DESC;

ALTER TABLE "MinerData"."api_PayoutDates"
    OWNER TO mooney;

