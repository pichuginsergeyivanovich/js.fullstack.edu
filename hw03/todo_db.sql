--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0 (Debian 15.0-1.pgdg110+1)
-- Dumped by pg_dump version 15.0 (Debian 15.0-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alert; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alert (
    id integer,
    task_id integer,
    alert_type_id integer,
    alert_time time with time zone,
    created timestamp with time zone
);


ALTER TABLE public.alert OWNER TO postgres;

--
-- Name: alert_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alert_type (
    id integer NOT NULL,
    alert_type_name character varying(128)
);


ALTER TABLE public.alert_type OWNER TO postgres;

--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id integer NOT NULL,
    title character varying(128),
    text text,
    plan timestamp without time zone,
    done timestamp with time zone,
    parent integer,
    cost money,
    user_id integer,
    task_list_id integer
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.task ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: task_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_list (
    id integer NOT NULL,
    user_id integer,
    title character varying(256),
    created timestamp with time zone
);


ALTER TABLE public.task_list OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(128),
    email character varying(128),
    password_hash character varying(128)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: alert_type pk_alert_type_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alert_type
    ADD CONSTRAINT pk_alert_type_id PRIMARY KEY (id);


--
-- Name: task_list pk_task_list_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_list
    ADD CONSTRAINT pk_task_list_id PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: fk_alert_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fk_alert_type_id ON public.alert USING btree (alert_type_id);


--
-- Name: fki_fk_task_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_task_id ON public.alert USING btree (task_id);


--
-- Name: fki_fk_task_task_list_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_task_task_list_id ON public.task USING btree (task_list_id);


--
-- Name: alert fk_alert_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alert
    ADD CONSTRAINT fk_alert_type_id FOREIGN KEY (alert_type_id) REFERENCES public.alert_type(id) NOT VALID;


--
-- Name: alert fk_task_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alert
    ADD CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES public.task(id) NOT VALID;


--
-- Name: task fk_task_task_list_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk_task_task_list_id FOREIGN KEY (task_list_id) REFERENCES public.task_list(id) NOT VALID;


--
-- Name: task_list task_list_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_list
    ADD CONSTRAINT task_list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

