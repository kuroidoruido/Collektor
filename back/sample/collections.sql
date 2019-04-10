--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Debian 11.2-1.pgdg90+1)
-- Dumped by pg_dump version 11.2

-- Started on 2019-04-10 23:10:11 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2961 (class 1262 OID 16384)
-- Name: collektor-back; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "collektor-back" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE "collektor-back" OWNER TO postgres;

\connect -reuse-previous=on "dbname='collektor-back'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 212 (class 1259 OID 16548)
-- Name: collections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collections (
    id integer NOT NULL,
    label character varying(255),
    template jsonb,
    owner integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.collections OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16543)
-- Name: collections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collections_id_seq OWNER TO postgres;

--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 210
-- Name: collections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collections_id_seq OWNED BY public.collections.id;


--
-- TOC entry 2829 (class 2604 OID 16555)
-- Name: collections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collections ALTER COLUMN id SET DEFAULT nextval('public.collections_id_seq'::regclass);


--
-- TOC entry 2955 (class 0 OID 16548)
-- Dependencies: 212
-- Data for Name: collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.collections VALUES (1, 'Amiibo', '{"fields": [{"type": "Autocomplete-Text", "index": 0, "label": "Serie"}]}', 2, '2019-03-06 22:35:41.424+00', '2019-03-06 22:42:17.884+00');
INSERT INTO public.collections VALUES (2, 'Console', '{"fields": [{"type": "Integer", "index": 1, "label": "Generation"}, {"type": "Autocomplete-Text", "index": 0, "label": "Developer"}, {"type": "Enum", "index": 2, "label": "Type", "typeOption": "Handheld|Home|Hybrid"}]}', 1, '2019-03-06 22:39:10.664+00', '2019-03-07 06:44:20.365+00');


--
-- TOC entry 2963 (class 0 OID 0)
-- Dependencies: 210
-- Name: collections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collections_id_seq', 2, true);


--
-- TOC entry 2831 (class 2606 OID 16562)
-- Name: collections collections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (id);


--
-- TOC entry 2832 (class 1259 OID 16563)
-- Name: search_collections_label; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_collections_label ON public.collections USING gin (label public.gin_trgm_ops);


-- Completed on 2019-04-10 23:10:11 CEST

--
-- PostgreSQL database dump complete
--

