



-- Type: type_status

-- DROP TYPE IF EXISTS public.type_status;

CREATE TYPE public.type_status AS ENUM
    ('start', 'pending', 'complete');

ALTER TYPE public.type_status
    OWNER TO postgres;


-- Table: public.contract_data

-- DROP TABLE IF EXISTS public.contract_data;

CREATE TABLE IF NOT EXISTS public.contract_data
(
    id serial,
    title character varying(500) COLLATE pg_catalog."default",
    contract_agg text COLLATE pg_catalog."default" NOT NULL,
    whose_created character varying(500) COLLATE pg_catalog."default",
    status type_status NOT NULL,
    is_accepted boolean DEFAULT false,
    CONSTRAINT contract_data_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contract_data
    OWNER to postgres;



-- PROCEDURE: public.sp_update_contract_data(integer, character varying, character varying, character varying, character varying)

-- DROP PROCEDURE IF EXISTS public.sp_update_contract_data(integer, character varying, character varying, character varying, character varying);

CREATE OR REPLACE PROCEDURE public.sp_update_contract_data(
	id_c integer,
	title_c character varying,
	contract_agg_c character varying,
	whose_created_c character varying,
	status_c character varying)
LANGUAGE 'plpgsql'
AS $BODY$
declare success int;
begin
	UPDATE public.contract_data 
	SET title=title_c,
	contract_agg=contract_agg_c,
	whose_created=whose_created_c,
	status=CAST(status_c as type_status)
	where id=id_c;
	COMMIT;
	success:=1;
end; 
$BODY$;

ALTER PROCEDURE public.sp_update_contract_data(integer, character varying, character varying, character varying, character varying)
    OWNER TO postgres;
