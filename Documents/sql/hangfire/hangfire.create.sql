--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.17
-- Dumped by pg_dump version 9.4.17
-- Started on 2018-06-16 16:15:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 2111 (class 0 OID 0)
-- Dependencies: 2110
-- Name: DATABASE hangfire; Type: COMMENT; Schema: -; Owner: hangfire
--

COMMENT ON DATABASE hangfire IS 'A database for hangfire background worker purposes';


--
-- TOC entry 8 (class 2615 OID 16590)
-- Name: hangfire; Type: SCHEMA; Schema: -; Owner: hangfire
--

CREATE SCHEMA hangfire;


ALTER SCHEMA hangfire OWNER TO hangfire;

--
-- TOC entry 1 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2114 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 176 (class 1259 OID 16598)
-- Name: counter; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.counter (
    id integer NOT NULL,
    key character varying(100) NOT NULL,
    value smallint NOT NULL,
    expireat timestamp without time zone,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.counter OWNER TO hangfire;

--
-- TOC entry 175 (class 1259 OID 16596)
-- Name: counter_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.counter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.counter_id_seq OWNER TO hangfire;

--
-- TOC entry 2115 (class 0 OID 0)
-- Dependencies: 175
-- Name: counter_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.counter_id_seq OWNED BY hangfire.counter.id;


--
-- TOC entry 178 (class 1259 OID 16607)
-- Name: hash; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.hash (
    id integer NOT NULL,
    key character varying(100) NOT NULL,
    field character varying(100) NOT NULL,
    value text,
    expireat timestamp without time zone,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.hash OWNER TO hangfire;

--
-- TOC entry 177 (class 1259 OID 16605)
-- Name: hash_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.hash_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.hash_id_seq OWNER TO hangfire;

--
-- TOC entry 2116 (class 0 OID 0)
-- Dependencies: 177
-- Name: hash_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.hash_id_seq OWNED BY hangfire.hash.id;


--
-- TOC entry 180 (class 1259 OID 16620)
-- Name: job; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.job (
    id integer NOT NULL,
    stateid integer,
    statename character varying(20),
    invocationdata text NOT NULL,
    arguments text NOT NULL,
    createdat timestamp without time zone NOT NULL,
    expireat timestamp without time zone,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.job OWNER TO hangfire;

--
-- TOC entry 179 (class 1259 OID 16618)
-- Name: job_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.job_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.job_id_seq OWNER TO hangfire;

--
-- TOC entry 2117 (class 0 OID 0)
-- Dependencies: 179
-- Name: job_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.job_id_seq OWNED BY hangfire.job.id;


--
-- TOC entry 191 (class 1259 OID 16690)
-- Name: jobparameter; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.jobparameter (
    id integer NOT NULL,
    jobid integer NOT NULL,
    name character varying(40) NOT NULL,
    value text,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.jobparameter OWNER TO hangfire;

--
-- TOC entry 190 (class 1259 OID 16688)
-- Name: jobparameter_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.jobparameter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.jobparameter_id_seq OWNER TO hangfire;

--
-- TOC entry 2118 (class 0 OID 0)
-- Dependencies: 190
-- Name: jobparameter_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.jobparameter_id_seq OWNED BY hangfire.jobparameter.id;


--
-- TOC entry 184 (class 1259 OID 16649)
-- Name: jobqueue; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.jobqueue (
    id integer NOT NULL,
    jobid integer NOT NULL,
    queue character varying(20) NOT NULL,
    fetchedat timestamp without time zone,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.jobqueue OWNER TO hangfire;

--
-- TOC entry 183 (class 1259 OID 16647)
-- Name: jobqueue_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.jobqueue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.jobqueue_id_seq OWNER TO hangfire;

--
-- TOC entry 2119 (class 0 OID 0)
-- Dependencies: 183
-- Name: jobqueue_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.jobqueue_id_seq OWNED BY hangfire.jobqueue.id;


--
-- TOC entry 186 (class 1259 OID 16658)
-- Name: list; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.list (
    id integer NOT NULL,
    key character varying(100) NOT NULL,
    value text,
    expireat timestamp without time zone,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.list OWNER TO hangfire;

--
-- TOC entry 185 (class 1259 OID 16656)
-- Name: list_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.list_id_seq OWNER TO hangfire;

--
-- TOC entry 2120 (class 0 OID 0)
-- Dependencies: 185
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.list_id_seq OWNED BY hangfire.list.id;


--
-- TOC entry 192 (class 1259 OID 16705)
-- Name: lock; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.lock (
    resource character varying(100) NOT NULL,
    updatecount integer DEFAULT 0 NOT NULL,
    acquired timestamp without time zone
);


ALTER TABLE hangfire.lock OWNER TO hangfire;

--
-- TOC entry 174 (class 1259 OID 16591)
-- Name: schema; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.schema (
    version integer NOT NULL
);


ALTER TABLE hangfire.schema OWNER TO hangfire;

--
-- TOC entry 187 (class 1259 OID 16667)
-- Name: server; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.server (
    id character varying(100) NOT NULL,
    data text,
    lastheartbeat timestamp without time zone NOT NULL,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.server OWNER TO hangfire;

--
-- TOC entry 189 (class 1259 OID 16677)
-- Name: set; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.set (
    id integer NOT NULL,
    key character varying(100) NOT NULL,
    score double precision NOT NULL,
    value text NOT NULL,
    expireat timestamp without time zone,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.set OWNER TO hangfire;

--
-- TOC entry 188 (class 1259 OID 16675)
-- Name: set_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.set_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.set_id_seq OWNER TO hangfire;

--
-- TOC entry 2121 (class 0 OID 0)
-- Dependencies: 188
-- Name: set_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.set_id_seq OWNED BY hangfire.set.id;


--
-- TOC entry 182 (class 1259 OID 16632)
-- Name: state; Type: TABLE; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE TABLE hangfire.state (
    id integer NOT NULL,
    jobid integer NOT NULL,
    name character varying(20) NOT NULL,
    reason character varying(100),
    createdat timestamp without time zone NOT NULL,
    data text,
    updatecount integer DEFAULT 0 NOT NULL
);


ALTER TABLE hangfire.state OWNER TO hangfire;

--
-- TOC entry 181 (class 1259 OID 16630)
-- Name: state_id_seq; Type: SEQUENCE; Schema: hangfire; Owner: hangfire
--

CREATE SEQUENCE hangfire.state_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hangfire.state_id_seq OWNER TO hangfire;

--
-- TOC entry 2122 (class 0 OID 0)
-- Dependencies: 181
-- Name: state_id_seq; Type: SEQUENCE OWNED BY; Schema: hangfire; Owner: hangfire
--

ALTER SEQUENCE hangfire.state_id_seq OWNED BY hangfire.state.id;


--
-- TOC entry 1943 (class 2604 OID 16601)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.counter ALTER COLUMN id SET DEFAULT nextval('hangfire.counter_id_seq'::regclass);


--
-- TOC entry 1945 (class 2604 OID 16610)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.hash ALTER COLUMN id SET DEFAULT nextval('hangfire.hash_id_seq'::regclass);


--
-- TOC entry 1947 (class 2604 OID 16623)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.job ALTER COLUMN id SET DEFAULT nextval('hangfire.job_id_seq'::regclass);


--
-- TOC entry 1958 (class 2604 OID 16693)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.jobparameter ALTER COLUMN id SET DEFAULT nextval('hangfire.jobparameter_id_seq'::regclass);


--
-- TOC entry 1951 (class 2604 OID 16652)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.jobqueue ALTER COLUMN id SET DEFAULT nextval('hangfire.jobqueue_id_seq'::regclass);


--
-- TOC entry 1953 (class 2604 OID 16661)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.list ALTER COLUMN id SET DEFAULT nextval('hangfire.list_id_seq'::regclass);


--
-- TOC entry 1956 (class 2604 OID 16680)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.set ALTER COLUMN id SET DEFAULT nextval('hangfire.set_id_seq'::regclass);


--
-- TOC entry 1949 (class 2604 OID 16635)
-- Name: id; Type: DEFAULT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.state ALTER COLUMN id SET DEFAULT nextval('hangfire.state_id_seq'::regclass);


--
-- TOC entry 1964 (class 2606 OID 16603)
-- Name: counter_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.counter
    ADD CONSTRAINT counter_pkey PRIMARY KEY (id);


--
-- TOC entry 1968 (class 2606 OID 16617)
-- Name: hash_key_field_key; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.hash
    ADD CONSTRAINT hash_key_field_key UNIQUE (key, field);


--
-- TOC entry 1970 (class 2606 OID 16615)
-- Name: hash_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.hash
    ADD CONSTRAINT hash_pkey PRIMARY KEY (id);


--
-- TOC entry 1973 (class 2606 OID 16628)
-- Name: job_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);


--
-- TOC entry 1991 (class 2606 OID 16698)
-- Name: jobparameter_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.jobparameter
    ADD CONSTRAINT jobparameter_pkey PRIMARY KEY (id);


--
-- TOC entry 1980 (class 2606 OID 16654)
-- Name: jobqueue_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.jobqueue
    ADD CONSTRAINT jobqueue_pkey PRIMARY KEY (id);


--
-- TOC entry 1982 (class 2606 OID 16666)
-- Name: list_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- TOC entry 1993 (class 2606 OID 16709)
-- Name: lock_resource_key; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.lock
    ADD CONSTRAINT lock_resource_key UNIQUE (resource);


--
-- TOC entry 1962 (class 2606 OID 16595)
-- Name: schema_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.schema
    ADD CONSTRAINT schema_pkey PRIMARY KEY (version);


--
-- TOC entry 1984 (class 2606 OID 16789)
-- Name: server_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.server
    ADD CONSTRAINT server_pkey PRIMARY KEY (id);


--
-- TOC entry 1986 (class 2606 OID 16687)
-- Name: set_key_value_key; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.set
    ADD CONSTRAINT set_key_value_key UNIQUE (key, value);


--
-- TOC entry 1988 (class 2606 OID 16685)
-- Name: set_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.set
    ADD CONSTRAINT set_pkey PRIMARY KEY (id);


--
-- TOC entry 1976 (class 2606 OID 16640)
-- Name: state_pkey; Type: CONSTRAINT; Schema: hangfire; Owner: hangfire; Tablespace: 
--

ALTER TABLE ONLY hangfire.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (id);


--
-- TOC entry 1965 (class 1259 OID 16790)
-- Name: ix_hangfire_counter_expireat; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_counter_expireat ON hangfire.counter USING btree (expireat);


--
-- TOC entry 1966 (class 1259 OID 16604)
-- Name: ix_hangfire_counter_key; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_counter_key ON hangfire.counter USING btree (key);


--
-- TOC entry 1971 (class 1259 OID 16629)
-- Name: ix_hangfire_job_statename; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_job_statename ON hangfire.job USING btree (statename);


--
-- TOC entry 1989 (class 1259 OID 16704)
-- Name: ix_hangfire_jobparameter_jobidandname; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_jobparameter_jobidandname ON hangfire.jobparameter USING btree (jobid, name);


--
-- TOC entry 1977 (class 1259 OID 16791)
-- Name: ix_hangfire_jobqueue_jobidandqueue; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_jobqueue_jobidandqueue ON hangfire.jobqueue USING btree (jobid, queue);


--
-- TOC entry 1978 (class 1259 OID 16655)
-- Name: ix_hangfire_jobqueue_queueandfetchedat; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_jobqueue_queueandfetchedat ON hangfire.jobqueue USING btree (queue, fetchedat);


--
-- TOC entry 1974 (class 1259 OID 16646)
-- Name: ix_hangfire_state_jobid; Type: INDEX; Schema: hangfire; Owner: hangfire; Tablespace: 
--

CREATE INDEX ix_hangfire_state_jobid ON hangfire.state USING btree (jobid);


--
-- TOC entry 1995 (class 2606 OID 16699)
-- Name: jobparameter_jobid_fkey; Type: FK CONSTRAINT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.jobparameter
    ADD CONSTRAINT jobparameter_jobid_fkey FOREIGN KEY (jobid) REFERENCES hangfire.job(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1994 (class 2606 OID 16641)
-- Name: state_jobid_fkey; Type: FK CONSTRAINT; Schema: hangfire; Owner: hangfire
--

ALTER TABLE ONLY hangfire.state
    ADD CONSTRAINT state_jobid_fkey FOREIGN KEY (jobid) REFERENCES hangfire.job(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2113 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-06-16 16:15:47

--
-- PostgreSQL database dump complete
--

