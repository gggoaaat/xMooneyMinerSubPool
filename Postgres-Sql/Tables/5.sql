-- Table: MinerData.Payout_Log

-- DROP TABLE "MinerData"."Payout_Log";

CREATE TABLE IF NOT EXISTS "MinerData"."Payout_Log"
(
    "ID" integer NOT NULL DEFAULT nextval('"MinerData"."Payout_Log_ID_seq"'::regclass),
    "SnapTime" character varying(100) COLLATE pg_catalog."default" DEFAULT now(),
    "Algo" character varying COLLATE pg_catalog."default",
    start bigint NOT NULL,
    "end" bigint NOT NULL,
    amount bigint NOT NULL,
    "txHash" character varying COLLATE pg_catalog."default" NOT NULL,
    "paidOn" character varying COLLATE pg_catalog."default" NOT NULL,
    "paidPrevious" character varying COLLATE pg_catalog."default",
    "PayOutProcessed" boolean NOT NULL DEFAULT false,
    "PayOutDate" timestamp without time zone,
    "EthRatioAtPayout" character varying COLLATE pg_catalog."default",
    "OneEthToMooney" double precision,
    "EthRatioToBNB" character varying COLLATE pg_catalog."default" NOT NULL DEFAULT '-'::character varying,
    "OneEthToBNB" double precision NOT NULL DEFAULT 0,
    "MooneytoUSDPrice" double precision NOT NULL DEFAULT 0,
    "EthUSDPrice" double precision,
    "BNBUSDPrice" double precision,
    CONSTRAINT "Payout_Log_pkey" PRIMARY KEY (start, "end", "txHash")
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."Payout_Log"
    OWNER to mooney;