-- View: MinerData.MappedMartians

-- DROP VIEW "MinerData"."MappedMartians";

CREATE OR REPLACE VIEW "MinerData"."MappedMartians"
 AS
 SELECT 'Martian'::text || m."Martian"::text AS "Martian",
    mw.worker AS "Worker",
    m."WalletAddress",
    wl.entrydate AS "StartDate"
   FROM ( SELECT a.worker,
            min(a."entryDate") AS entrydate
           FROM "MinerData"."Worker_Log" a
          GROUP BY a.worker) wl
     FULL JOIN "MinerData"."MinersAndWokers" mw ON wl.worker::text = mw.worker::text
     FULL JOIN "MinerData"."Miners" m ON m."Handle"::text = mw."Miner"::text
  WHERE m."Martian" IS NOT NULL
  ORDER BY m."Martian";

ALTER TABLE "MinerData"."MappedMartians"
    OWNER TO mooney;

