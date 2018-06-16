--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.17
-- Dumped by pg_dump version 9.4.17
-- Started on 2018-06-16 16:14:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 2074 (class 1262 OID 16393)
-- Name: reservationsystem; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE reservationsystem WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE reservationsystem OWNER TO postgres;

\connect reservationsystem

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 1 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2077 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 180 (class 1259 OID 16483)
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.devices (
    room_code text NOT NULL,
    device_id integer NOT NULL
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16794)
-- Name: devices_device_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.devices_device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.devices_device_id_seq OWNER TO postgres;

--
-- TOC entry 2078 (class 0 OID 0)
-- Dependencies: 186
-- Name: devices_device_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.devices_device_id_seq OWNED BY public.devices.device_id;


--
-- TOC entry 179 (class 1259 OID 16467)
-- Name: issues; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.issues (
    issue_id integer NOT NULL,
    room_code text NOT NULL,
    description text,
    created_on timestamp without time zone NOT NULL,
    resolved bit(1) NOT NULL
);


ALTER TABLE public.issues OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 16465)
-- Name: issues_issue_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.issues_issue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issues_issue_id_seq OWNER TO postgres;

--
-- TOC entry 2079 (class 0 OID 0)
-- Dependencies: 178
-- Name: issues_issue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;


--
-- TOC entry 182 (class 1259 OID 16502)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    description text,
    created_on timestamp without time zone NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16500)
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_notification_id_seq OWNER TO postgres;

--
-- TOC entry 2080 (class 0 OID 0)
-- Dependencies: 181
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- TOC entry 183 (class 1259 OID 16519)
-- Name: participants; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.participants (
    user_id text NOT NULL,
    room_code text NOT NULL,
    start_time timestamp without time zone NOT NULL
);


ALTER TABLE public.participants OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 16424)
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.reservations (
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone,
    room_code text NOT NULL,
    user_id text NOT NULL,
    description text,
    reservation_id integer NOT NULL
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16570)
-- Name: reservations_reeservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_reeservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_reeservation_id_seq OWNER TO postgres;

--
-- TOC entry 2081 (class 0 OID 0)
-- Dependencies: 185
-- Name: reservations_reeservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_reeservation_id_seq OWNED BY public.reservations.reservation_id;


--
-- TOC entry 175 (class 1259 OID 16415)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    type text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 16413)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 2082 (class 0 OID 0)
-- Dependencies: 174
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 173 (class 1259 OID 16394)
-- Name: room_readings; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.room_readings (
    created_on timestamp without time zone NOT NULL,
    type text NOT NULL,
    value integer,
    device_id integer NOT NULL
);


ALTER TABLE public.room_readings OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 16429)
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.rooms (
    room_code text NOT NULL,
    has_smartboard bit(1),
    has_computer bit(1),
    has_windows bit(1),
    student_capacity integer
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 16522)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.users (
    user_id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    first_name text,
    last_name text,
    role integer NOT NULL,
    picture text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 1933 (class 2604 OID 16796)
-- Name: device_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices ALTER COLUMN device_id SET DEFAULT nextval('public.devices_device_id_seq'::regclass);


--
-- TOC entry 1932 (class 2604 OID 16470)
-- Name: issue_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues ALTER COLUMN issue_id SET DEFAULT nextval('public.issues_issue_id_seq'::regclass);


--
-- TOC entry 1934 (class 2604 OID 16505)
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- TOC entry 1931 (class 2604 OID 16572)
-- Name: reservation_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN reservation_id SET DEFAULT nextval('public.reservations_reeservation_id_seq'::regclass);


--
-- TOC entry 1930 (class 2604 OID 16418)
-- Name: role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 1947 (class 2606 OID 16808)
-- Name: device_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT device_pk PRIMARY KEY (device_id);


--
-- TOC entry 1945 (class 2606 OID 16475)
-- Name: issues_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pk PRIMARY KEY (room_code, issue_id);


--
-- TOC entry 1949 (class 2606 OID 16511)
-- Name: notifications_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pk PRIMARY KEY (notification_id);


--
-- TOC entry 1951 (class 2606 OID 16549)
-- Name: participants_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pk PRIMARY KEY (user_id, room_code, start_time);


--
-- TOC entry 1936 (class 2606 OID 16805)
-- Name: readings_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.room_readings
    ADD CONSTRAINT readings_pk PRIMARY KEY (created_on, type, device_id);


--
-- TOC entry 1941 (class 2606 OID 16582)
-- Name: reservations_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pk PRIMARY KEY (reservation_id);


--
-- TOC entry 1938 (class 2606 OID 16423)
-- Name: roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (role_id);


--
-- TOC entry 1943 (class 2606 OID 16436)
-- Name: rooms_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pk PRIMARY KEY (room_code);


--
-- TOC entry 1953 (class 2606 OID 16529)
-- Name: users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- TOC entry 1939 (class 1259 OID 16459)
-- Name: fki_reservations_rooms_fk; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_reservations_rooms_fk ON public.reservations USING btree (room_code);


--
-- TOC entry 1957 (class 2606 OID 16476)
-- Name: issues_rooms_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_rooms_fk FOREIGN KEY (room_code) REFERENCES public.rooms(room_code);


--
-- TOC entry 1958 (class 2606 OID 16540)
-- Name: notifications_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_users_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 1954 (class 2606 OID 16809)
-- Name: readings_devices_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_readings
    ADD CONSTRAINT readings_devices_fk FOREIGN KEY (device_id) REFERENCES public.devices(device_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1955 (class 2606 OID 16454)
-- Name: reservations_rooms_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_rooms_fk FOREIGN KEY (room_code) REFERENCES public.rooms(room_code);


--
-- TOC entry 1956 (class 2606 OID 16535)
-- Name: reservations_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_users_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 1959 (class 2606 OID 16530)
-- Name: users_roles_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles_fk FOREIGN KEY (role) REFERENCES public.roles(role_id);


--
-- TOC entry 2076 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-06-16 16:14:19

--
-- PostgreSQL database dump complete
--

