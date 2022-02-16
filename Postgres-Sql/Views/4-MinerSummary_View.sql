-- View: MinerData.MinerAllTimeComputation

-- DROP VIEW "MinerData"."MinerAllTimeComputation";

CREATE OR REPLACE VIEW "MinerData"."MinerAllTimeComputation"
 AS
 SELECT "MinerSummary_View"."Presence Count",
    "MinerSummary_View".worker,
    "MinerSummary_View"."Average Shares",
    round("MinerSummary_View"."Presence Count"::numeric * 100.0 / "MinerSummary_View"."Total Captures"::numeric, 1) || '%'::text AS "Percent Contribution",
    "MinerSummary_View"."First Ping"
   FROM "MinerData"."MinerSummary_View";

ALTER TABLE "MinerData"."MinerAllTimeComputation"
    OWNER TO mooney;

