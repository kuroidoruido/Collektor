--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Debian 11.2-1.pgdg90+1)
-- Dumped by pg_dump version 11.2

-- Started on 2019-04-10 23:13:28 CEST

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
-- TOC entry 2956 (class 0 OID 16545)
-- Dependencies: 211
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.items VALUES (1, 'Isabelle', 'owned', '{"Serie": "Animal Crossing"}', 1, '2019-03-06 22:41:32.787+00', '2019-03-06 22:42:03.85+00');
INSERT INTO public.items VALUES (3, 'Kirby', 'wanted', '{"Serie": "Kirby"}', 1, '2019-03-06 22:42:48.774+00', '2019-03-06 22:42:48.785+00');
INSERT INTO public.items VALUES (4, 'Nintendo Switch', 'owned new', '{"type": "Hybrid", "Developer": "Nintendo", "Generation": "8"}', 2, '2019-03-06 22:44:30.476+00', '2019-03-06 22:44:30.489+00');
INSERT INTO public.items VALUES (5, 'Nintendo 64', 'wanted', '{"type": "Home", "Developer": "Nintendo", "Generation": "5"}', 2, '2019-03-06 22:48:49.182+00', '2019-03-06 22:48:49.195+00');
INSERT INTO public.items VALUES (2, 'Nook', 'owned', '{"Serie": "Animal Crossing 2"}', 1, '2019-03-06 22:41:58.793+00', '2019-03-07 06:56:36.945+00');


--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 209
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 5, true);


-- Completed on 2019-04-10 23:13:28 CEST

--
-- PostgreSQL database dump complete
--

