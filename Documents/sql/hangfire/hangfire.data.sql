--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.17
-- Dumped by pg_dump version 9.4.17
-- Started on 2018-06-16 16:16:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 2107 (class 0 OID 16598)
-- Dependencies: 176
-- Data for Name: counter; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.counter (id, key, value, expireat, updatecount) FROM stdin;
190	stats:succeeded:2018-06-15	1	2018-07-15 11:00:02.859	0
274	stats:succeeded:2018-06-15	1	2018-07-15 17:00:01.469	0
275	stats:succeeded:2018-06-15-17	1	2018-06-16 17:00:01.469	0
204	stats:succeeded:2018-06-15	1	2018-07-15 11:35:19.074	0
11	stats:succeeded:2018-06-14	1	2018-07-14 12:41:24.404	0
288	stats:succeeded:2018-06-15	1	2018-07-15 18:06:03.88	0
290	stats:succeeded:2018-06-15-18	1	2018-06-16 18:06:03.88	0
16	stats:succeeded:2018-06-14	1	2018-07-14 12:49:59.42	0
298	stats:succeeded:2018-06-15	1	2018-07-15 19:00:00.486	0
299	stats:succeeded:2018-06-15-19	1	2018-06-16 19:00:00.486	0
222	stats:succeeded:2018-06-15	1	2018-07-15 13:00:00.861	0
21	stats:succeeded:2018-06-14	1	2018-07-14 12:56:16.795	0
233	stats:succeeded:2018-06-15	1	2018-07-15 14:00:00.24	0
26	stats:succeeded:2018-06-14	1	2018-07-14 13:00:46.733	0
312	stats:succeeded:2018-06-15	1	2018-07-15 20:01:01.849	0
238	stats:succeeded:2018-06-15	1	2018-07-15 15:00:00.898	0
239	stats:succeeded:2018-06-15-15	1	2018-06-16 15:00:00.898	0
31	stats:succeeded:2018-06-14	1	2018-07-14 13:03:42.873	0
314	stats:succeeded:2018-06-15-20	1	2018-06-16 20:01:01.849	0
94	stats:succeeded:2018-06-15	1	2018-07-15 09:00:01.026	0
36	stats:succeeded:2018-06-14	1	2018-07-14 13:04:30.11	0
320	stats:succeeded:2018-06-15	1	2018-07-15 21:00:00.827	0
97	stats:succeeded:2018-06-15	1	2018-07-15 09:02:00.328	0
244	stats:succeeded:2018-06-15	1	2018-07-15 15:00:00.945	0
41	stats:succeeded:2018-06-14	1	2018-07-14 13:08:21.224	0
321	stats:succeeded:2018-06-15-21	1	2018-06-16 21:00:00.827	0
245	stats:succeeded:2018-06-15-15	1	2018-06-16 15:00:00.945	0
102	stats:succeeded:2018-06-15	1	2018-07-15 09:10:27.048	0
105	stats:succeeded:2018-06-15	1	2018-07-15 09:10:48.375	0
110	stats:succeeded:2018-06-15	1	2018-07-15 09:21:09.865	0
113	stats:succeeded:2018-06-15	1	2018-07-15 09:21:30.864	0
118	stats:succeeded:2018-06-15	1	2018-07-15 09:28:56.143	0
121	stats:succeeded:2018-06-15	1	2018-07-15 09:28:56.18	0
126	stats:succeeded:2018-06-15	1	2018-07-15 09:55:04.086	0
129	stats:succeeded:2018-06-15	1	2018-07-15 10:00:00.487	0
132	stats:succeeded:2018-06-15	1	2018-07-15 10:00:01.033	0
168	stats:succeeded:2018-06-15	1	2018-07-15 10:08:11.407	0
171	stats:succeeded:2018-06-15	1	2018-07-15 10:08:11.782	0
174	stats:succeeded:2018-06-15	1	2018-07-15 10:08:11.785	0
176	stats:succeeded:2018-06-15	1	2018-07-15 10:08:11.788	0
269	stats:succeeded:2018-06-15	1	2018-07-15 17:00:00.986	0
179	stats:succeeded:2018-06-15	1	2018-07-15 10:08:11.793	0
270	stats:succeeded:2018-06-15-17	1	2018-06-16 17:00:00.986	0
185	stats:succeeded:2018-06-15	1	2018-07-15 10:52:37.455	0
358	stats:succeeded:2018-06-16	1	2018-07-16 12:48:14.073	0
193	stats:succeeded:2018-06-15	1	2018-07-15 11:00:25.495	0
359	stats:succeeded:2018-06-16-12	1	2018-06-17 12:48:14.073	0
284	stats:succeeded:2018-06-15	1	2018-07-15 18:06:03.584	0
207	stats:succeeded:2018-06-15	1	2018-07-15 11:35:19.084	0
285	stats:succeeded:2018-06-15-18	1	2018-06-16 18:06:03.584	0
217	stats:succeeded:2018-06-15	1	2018-07-15 12:00:04.655	0
365	stats:succeeded	38	\N	0
227	stats:succeeded:2018-06-15	1	2018-07-15 13:00:01.407	0
293	stats:succeeded:2018-06-15	1	2018-07-15 18:06:03.88	0
294	stats:succeeded:2018-06-15-18	1	2018-06-16 18:06:03.88	0
366	stats:deleted	18	\N	0
247	stats:succeeded:2018-06-15	1	2018-07-15 15:00:00.976	0
248	stats:succeeded:2018-06-15-15	1	2018-06-16 15:00:00.976	0
313	stats:succeeded:2018-06-15	1	2018-07-15 20:01:01.849	0
315	stats:succeeded:2018-06-15-20	1	2018-06-16 20:01:01.849	0
272	stats:succeeded:2018-06-15	1	2018-07-15 17:00:01.469	0
273	stats:succeeded:2018-06-15-17	1	2018-06-16 17:00:01.469	0
287	stats:succeeded:2018-06-15	1	2018-07-15 18:06:03.88	0
289	stats:succeeded:2018-06-15-18	1	2018-06-16 18:06:03.88	0
210	stats:succeeded:2018-06-15	1	2018-07-15 11:35:19.114	0
225	stats:succeeded:2018-06-15	1	2018-07-15 13:00:01.407	0
309	stats:succeeded:2018-06-15	1	2018-07-15 20:01:01.397	0
241	stats:succeeded:2018-06-15	1	2018-07-15 15:00:00.913	0
242	stats:succeeded:2018-06-15-15	1	2018-06-16 15:00:00.913	0
310	stats:succeeded:2018-06-15-20	1	2018-06-16 20:01:01.397	0
325	stats:succeeded:2018-06-15	1	2018-07-15 22:00:00.315	0
264	stats:succeeded:2018-06-15	1	2018-07-15 16:00:00.643	0
265	stats:succeeded:2018-06-15-16	1	2018-06-16 16:00:00.643	0
326	stats:succeeded:2018-06-15-22	1	2018-06-16 22:00:00.315	0
\.


--
-- TOC entry 2142 (class 0 OID 0)
-- Dependencies: 175
-- Name: counter_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.counter_id_seq', 366, true);


--
-- TOC entry 2109 (class 0 OID 16607)
-- Dependencies: 178
-- Data for Name: hash; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.hash (id, key, field, value, expireat, updatecount) FROM stdin;
17	recurring-job:BackgroundWorker.CheckReservationsForDeletion	Queue	default	\N	0
23	recurring-job:BackgroundWorker.CheckNotificationsForDeletion	Job	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckNotificationsForDeletion","ParameterTypes":"[]","Arguments":"[]"}	\N	0
24	recurring-job:BackgroundWorker.CheckNotificationsForDeletion	Cron	0 0 * * SUN	\N	0
27	recurring-job:BackgroundWorker.CheckNotificationsForDeletion	CreatedAt	2018-06-15T10:48:42.7029807Z	\N	0
25	recurring-job:BackgroundWorker.CheckNotificationsForDeletion	TimeZoneId	UTC	\N	0
26	recurring-job:BackgroundWorker.CheckNotificationsForDeletion	Queue	default	\N	0
13	recurring-job:BackgroundWorker.CheckReservationsForReminders	CreatedAt	2018-06-15T09:54:02.4267049Z	\N	0
18	recurring-job:BackgroundWorker.CheckReservationsForDeletion	CreatedAt	2018-06-15T09:54:02.4891051Z	\N	0
20	recurring-job:BackgroundWorker.CheckReservationsForReminders	NextExecution	2018-06-18T06:00:00.0000000Z	\N	0
19	recurring-job:BackgroundWorker.CheckReservationsForDeletion	NextExecution	2018-06-17T00:00:00.0000000Z	\N	0
9	recurring-job:BackgroundWorker.CheckReservationsForReminders	Job	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	\N	0
10	recurring-job:BackgroundWorker.CheckReservationsForReminders	Cron	0 6-22 * * MON-FRI	\N	0
11	recurring-job:BackgroundWorker.CheckReservationsForReminders	TimeZoneId	UTC	\N	0
12	recurring-job:BackgroundWorker.CheckReservationsForReminders	Queue	default	\N	0
14	recurring-job:BackgroundWorker.CheckReservationsForDeletion	Job	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForDeletion","ParameterTypes":"[]","Arguments":"[]"}	\N	0
15	recurring-job:BackgroundWorker.CheckReservationsForDeletion	Cron	0 0 * * SUN	\N	0
16	recurring-job:BackgroundWorker.CheckReservationsForDeletion	TimeZoneId	UTC	\N	0
21	recurring-job:BackgroundWorker.CheckReservationsForReminders	LastExecution	2018-06-15T22:00:00.2373550Z	\N	0
22	recurring-job:BackgroundWorker.CheckReservationsForReminders	LastJobId	55	\N	0
28	recurring-job:BackgroundWorker.CheckNotificationsForDeletion	NextExecution	2018-06-17T00:00:00.0000000Z	\N	0
\.


--
-- TOC entry 2143 (class 0 OID 0)
-- Dependencies: 177
-- Name: hash_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.hash_id_seq', 28, true);


--
-- TOC entry 2111 (class 0 OID 16620)
-- Dependencies: 180
-- Data for Name: job; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.job (id, stateid, statename, invocationdata, arguments, createdat, expireat, updatecount) FROM stdin;
56	211	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-16 12:48:13.773095	2018-06-17 12:48:14.073	0
46	187	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 18:06:00.75891	2018-06-16 18:06:03.584	0
50	193	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 19:00:00.174118	2018-06-16 19:00:00.486	0
54	205	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 21:00:00.531032	2018-06-16 21:00:00.827	0
55	208	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 22:00:00.237355	2018-06-16 22:00:00.315	0
38	164	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 15:00:00.757996	2018-06-16 15:00:00.945	0
39	161	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"admin\\\\\\"\\",\\"\\\\\\"WD.01.016\\\\\\"\\",\\"\\\\\\"15:50\\\\\\"\\"]"}	["\\"admin\\"","\\"WD.01.016\\"","\\"15:50\\""]	2018-06-15 15:00:00.835996	2018-06-16 15:00:00.898	0
40	162	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"justmike112\\\\\\"\\",\\"\\\\\\"H.5.314\\\\\\"\\",\\"\\\\\\"15:50\\\\\\"\\"]"}	["\\"justmike112\\"","\\"H.5.314\\"","\\"15:50\\""]	2018-06-15 15:00:00.867196	2018-06-16 15:00:00.913	0
41	166	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"justmike112\\\\\\"\\",\\"\\\\\\"WD.04.002\\\\\\"\\",\\"\\\\\\"15:00\\\\\\"\\"]"}	["\\"justmike112\\"","\\"WD.04.002\\"","\\"15:00\\""]	2018-06-15 15:00:00.929596	2018-06-16 15:00:00.976	0
42	169	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 16:00:00.36283	2018-06-16 16:00:00.643	0
43	176	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 17:00:00.830166	2018-06-16 17:00:00.986	0
45	178	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"admin\\\\\\"\\",\\"\\\\\\"H.4.312\\\\\\"\\",\\"\\\\\\"15:00\\\\\\"\\"]"}	["\\"admin\\"","\\"H.4.312\\"","\\"15:00\\""]	2018-06-15 17:00:00.954966	2018-06-16 17:00:01.469	0
44	177	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"admin\\\\\\"\\",\\"\\\\\\"WD.01.016\\\\\\"\\",\\"\\\\\\"12:10\\\\\\"\\"]"}	["\\"admin\\"","\\"WD.01.016\\"","\\"12:10\\""]	2018-06-15 17:00:00.923766	2018-06-16 17:00:01.469	0
48	189	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"justmike112\\\\\\"\\",\\"\\\\\\"H.5.314\\\\\\"\\",\\"\\\\\\"15:50\\\\\\"\\"]"}	["\\"justmike112\\"","\\"H.5.314\\"","\\"15:50\\""]	2018-06-15 18:06:03.475315	2018-06-16 18:06:03.88	0
47	188	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"admin\\\\\\"\\",\\"\\\\\\"WD.01.016\\\\\\"\\",\\"\\\\\\"15:50\\\\\\"\\"]"}	["\\"admin\\"","\\"WD.01.016\\"","\\"15:50\\""]	2018-06-15 18:06:03.444115	2018-06-16 18:06:03.88	0
49	190	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"justmike112\\\\\\"\\",\\"\\\\\\"WD.04.002\\\\\\"\\",\\"\\\\\\"15:00\\\\\\"\\"]"}	["\\"justmike112\\"","\\"WD.04.002\\"","\\"15:00\\""]	2018-06-15 18:06:03.490915	2018-06-16 18:06:03.88	0
52	201	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"admin\\\\\\"\\",\\"\\\\\\"WD.01.016\\\\\\"\\",\\"\\\\\\"12:10\\\\\\"\\"]"}	["\\"admin\\"","\\"WD.01.016\\"","\\"12:10\\""]	2018-06-15 20:01:01.303445	2018-06-16 20:01:01.849	0
51	200	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"CheckReservationsForReminders","ParameterTypes":"[]","Arguments":"[]"}	[]	2018-06-15 20:01:01.100645	2018-06-16 20:01:01.397	0
53	202	Succeeded	{"Type":"ICT_LAB_Web.Components.Helper.BackgroundWorker, ICT-LAB-Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"RoomReminderNotification","ParameterTypes":"[\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\",\\"System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e\\"]","Arguments":"[\\"\\\\\\"admin\\\\\\"\\",\\"\\\\\\"H.4.312\\\\\\"\\",\\"\\\\\\"15:00\\\\\\"\\"]"}	["\\"admin\\"","\\"H.4.312\\"","\\"15:00\\""]	2018-06-15 20:01:01.334645	2018-06-16 20:01:01.849	0
\.


--
-- TOC entry 2144 (class 0 OID 0)
-- Dependencies: 179
-- Name: job_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.job_id_seq', 56, true);


--
-- TOC entry 2122 (class 0 OID 16690)
-- Dependencies: 191
-- Data for Name: jobparameter; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.jobparameter (id, jobid, name, value, updatecount) FROM stdin;
141	56	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
142	56	CurrentCulture	"en-US"	0
143	56	CurrentUICulture	"en-US"	0
97	38	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
98	38	CurrentCulture	"en-US"	0
99	38	CurrentUICulture	"en-US"	0
100	39	CurrentCulture	"en-US"	0
101	39	CurrentUICulture	"en-US"	0
102	40	CurrentCulture	"en-US"	0
103	40	CurrentUICulture	"en-US"	0
104	41	CurrentCulture	"en-US"	0
105	41	CurrentUICulture	"en-US"	0
106	42	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
107	42	CurrentCulture	"en-US"	0
108	42	CurrentUICulture	"en-US"	0
109	43	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
110	43	CurrentCulture	"en-US"	0
111	43	CurrentUICulture	"en-US"	0
112	44	CurrentCulture	"en-US"	0
113	44	CurrentUICulture	"en-US"	0
114	45	CurrentCulture	"en-US"	0
115	45	CurrentUICulture	"en-US"	0
116	46	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
117	46	CurrentCulture	"en-US"	0
118	46	CurrentUICulture	"en-US"	0
119	47	CurrentCulture	"en-US"	0
120	47	CurrentUICulture	"en-US"	0
121	48	CurrentCulture	"en-US"	0
122	48	CurrentUICulture	"en-US"	0
123	49	CurrentCulture	"en-US"	0
124	49	CurrentUICulture	"en-US"	0
125	50	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
126	50	CurrentCulture	"en-US"	0
127	50	CurrentUICulture	"en-US"	0
128	51	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
129	51	CurrentCulture	"en-US"	0
130	51	CurrentUICulture	"en-US"	0
131	52	CurrentCulture	"en-US"	0
132	52	CurrentUICulture	"en-US"	0
133	53	CurrentCulture	"en-US"	0
134	53	CurrentUICulture	"en-US"	0
135	54	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
136	54	CurrentCulture	"en-US"	0
137	54	CurrentUICulture	"en-US"	0
138	55	RecurringJobId	"BackgroundWorker.CheckReservationsForReminders"	0
139	55	CurrentCulture	"en-US"	0
140	55	CurrentUICulture	"en-US"	0
\.


--
-- TOC entry 2145 (class 0 OID 0)
-- Dependencies: 190
-- Name: jobparameter_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.jobparameter_id_seq', 143, true);


--
-- TOC entry 2115 (class 0 OID 16649)
-- Dependencies: 184
-- Data for Name: jobqueue; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.jobqueue (id, jobid, queue, fetchedat, updatecount) FROM stdin;
\.


--
-- TOC entry 2146 (class 0 OID 0)
-- Dependencies: 183
-- Name: jobqueue_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.jobqueue_id_seq', 59, true);


--
-- TOC entry 2117 (class 0 OID 16658)
-- Dependencies: 186
-- Data for Name: list; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.list (id, key, value, expireat, updatecount) FROM stdin;
\.


--
-- TOC entry 2147 (class 0 OID 0)
-- Dependencies: 185
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.list_id_seq', 1, false);


--
-- TOC entry 2123 (class 0 OID 16705)
-- Dependencies: 192
-- Data for Name: lock; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.lock (resource, updatecount, acquired) FROM stdin;
\.


--
-- TOC entry 2105 (class 0 OID 16591)
-- Dependencies: 174
-- Data for Name: schema; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.schema (version) FROM stdin;
7
\.


--
-- TOC entry 2118 (class 0 OID 16667)
-- Dependencies: 187
-- Data for Name: server; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.server (id, data, lastheartbeat, updatecount) FROM stdin;
0878090-win-201:be4b4ea0-8f2a-4065-8d52-bb596feaee3b	{"WorkerCount":10,"Queues":["default"],"StartedAt":"2018-06-16T14:10:46.1048194Z"}	2018-06-16 14:16:16.482	0
\.


--
-- TOC entry 2120 (class 0 OID 16677)
-- Dependencies: 189
-- Data for Name: set; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.set (id, key, score, value, expireat, updatecount) FROM stdin;
20	recurring-jobs	0	BackgroundWorker.CheckReservationsForReminders	\N	0
21	recurring-jobs	0	BackgroundWorker.CheckReservationsForDeletion	\N	0
24	recurring-jobs	0	BackgroundWorker.CheckNotificationsForDeletion	\N	0
\.


--
-- TOC entry 2148 (class 0 OID 0)
-- Dependencies: 188
-- Name: set_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.set_id_seq', 26, true);


--
-- TOC entry 2113 (class 0 OID 16632)
-- Dependencies: 182
-- Data for Name: state; Type: TABLE DATA; Schema: hangfire; Owner: hangfire
--

COPY hangfire.state (id, jobid, name, reason, createdat, data, updatecount) FROM stdin;
209	56	Enqueued	Triggered using recurring job manager	2018-06-16 12:48:13.851095	{"EnqueuedAt":"2018-06-16T12:48:13.7394945Z","Queue":"default"}	0
210	56	Processing	\N	2018-06-16 12:48:13.904297	{"StartedAt":"2018-06-16T12:48:13.8666957Z","ServerId":"0878090-win-201:c4c39d7f-4684-424f-89c1-07c6d88294d6","WorkerId":"f489ea69-a11c-4a99-807d-8e94167321d5"}	0
211	56	Succeeded	\N	2018-06-16 12:48:14.076306	{"SucceededAt":"2018-06-16T12:48:14.0593058Z","PerformanceDuration":"126","Latency":"159"}	0
155	38	Enqueued	Triggered by recurring job scheduler	2018-06-15 15:00:00.757996	{"EnqueuedAt":"2018-06-15T15:00:00.7579961Z","Queue":"default"}	0
156	38	Processing	\N	2018-06-15 15:00:00.773596	{"StartedAt":"2018-06-15T15:00:00.7735961Z","ServerId":"0878090-win-201:f8b193a1-8cc6-4d55-a415-46d0d3f7bd38","WorkerId":"1715e539-9869-43e0-af7d-45d6e21a3f71"}	0
157	39	Enqueued	\N	2018-06-15 15:00:00.851596	{"EnqueuedAt":"2018-06-15T15:00:00.8359962Z","Queue":"default"}	0
158	39	Processing	\N	2018-06-15 15:00:00.867196	{"StartedAt":"2018-06-15T15:00:00.8515963Z","ServerId":"0878090-win-201:f8b193a1-8cc6-4d55-a415-46d0d3f7bd38","WorkerId":"3d1be070-bdd5-46ae-a6a1-c9652d6ac128"}	0
159	40	Enqueued	\N	2018-06-15 15:00:00.867196	{"EnqueuedAt":"2018-06-15T15:00:00.8671963Z","Queue":"default"}	0
160	40	Processing	\N	2018-06-15 15:00:00.898396	{"StartedAt":"2018-06-15T15:00:00.8827963Z","ServerId":"0878090-win-201:f8b193a1-8cc6-4d55-a415-46d0d3f7bd38","WorkerId":"952d9762-1b2c-4269-a3b6-e17b256c919e"}	0
161	39	Succeeded	\N	2018-06-15 15:00:00.898396	{"SucceededAt":"2018-06-15T15:00:00.8827963Z","PerformanceDuration":"16","Latency":"31"}	0
162	40	Succeeded	\N	2018-06-15 15:00:00.929596	{"SucceededAt":"2018-06-15T15:00:00.9139964Z","PerformanceDuration":"7","Latency":"31"}	0
163	41	Enqueued	\N	2018-06-15 15:00:00.945196	{"EnqueuedAt":"2018-06-15T15:00:00.9295964Z","Queue":"default"}	0
164	38	Succeeded	\N	2018-06-15 15:00:00.945196	{"SucceededAt":"2018-06-15T15:00:00.9451964Z","PerformanceDuration":"158","Latency":"31"}	0
165	41	Processing	\N	2018-06-15 15:00:00.960796	{"StartedAt":"2018-06-15T15:00:00.9451964Z","ServerId":"0878090-win-201:f8b193a1-8cc6-4d55-a415-46d0d3f7bd38","WorkerId":"689f49a1-20fc-4df7-9f2f-04ca2fb1a867"}	0
166	41	Succeeded	\N	2018-06-15 15:00:00.976396	{"SucceededAt":"2018-06-15T15:00:00.9763965Z","PerformanceDuration":"9","Latency":"31"}	0
167	42	Enqueued	Triggered by recurring job scheduler	2018-06-15 16:00:00.44083	{"EnqueuedAt":"2018-06-15T16:00:00.3160302Z","Queue":"default"}	0
168	42	Processing	\N	2018-06-15 16:00:00.50323	{"StartedAt":"2018-06-15T16:00:00.4720305Z","ServerId":"0878090-win-201:ed595ef3-59b4-4710-9492-ad8156995e8a","WorkerId":"ce3f3e2e-baf8-4ffc-b793-677d47089ff7"}	0
169	42	Succeeded	\N	2018-06-15 16:00:00.64363	{"SucceededAt":"2018-06-15T16:00:00.6124307Z","PerformanceDuration":"104","Latency":"156"}	0
170	43	Enqueued	Triggered by recurring job scheduler	2018-06-15 17:00:00.845766	{"EnqueuedAt":"2018-06-15T17:00:00.8301661Z","Queue":"default"}	0
171	43	Processing	\N	2018-06-15 17:00:00.861366	{"StartedAt":"2018-06-15T17:00:00.8457661Z","ServerId":"0878090-win-201:ed595ef3-59b4-4710-9492-ad8156995e8a","WorkerId":"3253d990-6c74-45c4-b22b-7478e0badef5"}	0
172	44	Enqueued	\N	2018-06-15 17:00:00.939366	{"EnqueuedAt":"2018-06-15T17:00:00.9237662Z","Queue":"default"}	0
173	45	Enqueued	\N	2018-06-15 17:00:00.954966	{"EnqueuedAt":"2018-06-15T17:00:00.9549663Z","Queue":"default"}	0
174	44	Processing	\N	2018-06-15 17:00:00.970566	{"StartedAt":"2018-06-15T17:00:00.9549663Z","ServerId":"0878090-win-201:ed595ef3-59b4-4710-9492-ad8156995e8a","WorkerId":"ce3f3e2e-baf8-4ffc-b793-677d47089ff7"}	0
175	45	Processing	\N	2018-06-15 17:00:00.986166	{"StartedAt":"2018-06-15T17:00:00.9705663Z","ServerId":"0878090-win-201:ed595ef3-59b4-4710-9492-ad8156995e8a","WorkerId":"bc5e4d6e-f675-4cd1-bfb5-aa322d9ca0d3"}	0
177	44	Succeeded	\N	2018-06-15 17:00:01.469767	{"SucceededAt":"2018-06-15T17:00:01.4541672Z","PerformanceDuration":"476","Latency":"62"}	0
178	45	Succeeded	\N	2018-06-15 17:00:01.469767	{"SucceededAt":"2018-06-15T17:00:01.4541672Z","PerformanceDuration":"463","Latency":"46"}	0
176	43	Succeeded	\N	2018-06-15 17:00:00.986166	{"SucceededAt":"2018-06-15T17:00:00.9705663Z","PerformanceDuration":"109","Latency":"31"}	0
179	46	Enqueued	Triggered by recurring job scheduler	2018-06-15 18:06:00.82131	{"EnqueuedAt":"2018-06-15T18:06:00.7277106Z","Queue":"default"}	0
180	46	Processing	\N	2018-06-15 18:06:00.89931	{"StartedAt":"2018-06-15T18:06:00.8837109Z","ServerId":"0878090-win-201:b6d4df82-e577-405d-a280-59e0a9f6e30c","WorkerId":"2ac4fa8e-08d2-44c7-826e-257eab2a81d6"}	0
181	47	Enqueued	\N	2018-06-15 18:06:03.459715	{"EnqueuedAt":"2018-06-15T18:06:03.4441155Z","Queue":"default"}	0
182	48	Enqueued	\N	2018-06-15 18:06:03.475315	{"EnqueuedAt":"2018-06-15T18:06:03.4753155Z","Queue":"default"}	0
183	47	Processing	\N	2018-06-15 18:06:03.490915	{"StartedAt":"2018-06-15T18:06:03.4753155Z","ServerId":"0878090-win-201:b6d4df82-e577-405d-a280-59e0a9f6e30c","WorkerId":"94e66de8-650b-4607-8554-f051b7ec370c"}	0
184	48	Processing	\N	2018-06-15 18:06:03.506515	{"StartedAt":"2018-06-15T18:06:03.5065156Z","ServerId":"0878090-win-201:b6d4df82-e577-405d-a280-59e0a9f6e30c","WorkerId":"8c1f82aa-9752-408b-9017-90d67ee3acb2"}	0
185	49	Enqueued	\N	2018-06-15 18:06:03.506515	{"EnqueuedAt":"2018-06-15T18:06:03.4909156Z","Queue":"default"}	0
186	49	Processing	\N	2018-06-15 18:06:03.584515	{"StartedAt":"2018-06-15T18:06:03.5533157Z","ServerId":"0878090-win-201:b6d4df82-e577-405d-a280-59e0a9f6e30c","WorkerId":"51310273-7045-4e89-98fc-e37f204a8b8c"}	0
187	46	Succeeded	\N	2018-06-15 18:06:03.584515	{"SucceededAt":"2018-06-15T18:06:03.5533157Z","PerformanceDuration":"2628","Latency":"156"}	0
188	47	Succeeded	\N	2018-06-15 18:06:03.880916	{"SucceededAt":"2018-06-15T18:06:03.8653162Z","PerformanceDuration":"368","Latency":"62"}	0
189	48	Succeeded	\N	2018-06-15 18:06:03.880916	{"SucceededAt":"2018-06-15T18:06:03.8653162Z","PerformanceDuration":"352","Latency":"46"}	0
190	49	Succeeded	\N	2018-06-15 18:06:03.880916	{"SucceededAt":"2018-06-15T18:06:03.8653162Z","PerformanceDuration":"247","Latency":"124"}	0
191	50	Enqueued	Triggered by recurring job scheduler	2018-06-15 19:00:00.252118	{"EnqueuedAt":"2018-06-15T19:00:00.1117181Z","Queue":"default"}	0
192	50	Processing	\N	2018-06-15 19:00:00.330118	{"StartedAt":"2018-06-15T19:00:00.2989184Z","ServerId":"0878090-win-201:58ff3c6c-f09b-4ebc-b0c4-20551ea9df95","WorkerId":"594c81c6-037c-4029-9bb0-6a14bd2f1c50"}	0
193	50	Succeeded	\N	2018-06-15 19:00:00.486118	{"SucceededAt":"2018-06-15T19:00:00.4549187Z","PerformanceDuration":"113","Latency":"171"}	0
194	51	Enqueued	Triggered by recurring job scheduler	2018-06-15 20:01:01.163045	{"EnqueuedAt":"2018-06-15T20:01:01.0694454Z","Queue":"default"}	0
195	51	Processing	\N	2018-06-15 20:01:01.209845	{"StartedAt":"2018-06-15T20:01:01.1942456Z","ServerId":"0878090-win-201:b001a0d7-07b4-45fc-b59a-a311329e699b","WorkerId":"a4a987d1-cc2f-4b8b-a0a5-1887d8d70c2a"}	0
196	52	Enqueued	\N	2018-06-15 20:01:01.303445	{"EnqueuedAt":"2018-06-15T20:01:01.2878458Z","Queue":"default"}	0
197	52	Processing	\N	2018-06-15 20:01:01.334645	{"StartedAt":"2018-06-15T20:01:01.3190458Z","ServerId":"0878090-win-201:b001a0d7-07b4-45fc-b59a-a311329e699b","WorkerId":"a98af05a-fbd9-46f3-a2e4-aa6acd418561"}	0
198	53	Enqueued	\N	2018-06-15 20:01:01.334645	{"EnqueuedAt":"2018-06-15T20:01:01.3190458Z","Queue":"default"}	0
199	53	Processing	\N	2018-06-15 20:01:01.381445	{"StartedAt":"2018-06-15T20:01:01.3658459Z","ServerId":"0878090-win-201:b001a0d7-07b4-45fc-b59a-a311329e699b","WorkerId":"3d04abec-394d-4c57-aaf9-ec1442fd232e"}	0
200	51	Succeeded	\N	2018-06-15 20:01:01.397046	{"SucceededAt":"2018-06-15T20:01:01.3502459Z","PerformanceDuration":"135","Latency":"124"}	0
201	52	Succeeded	\N	2018-06-15 20:01:01.849446	{"SucceededAt":"2018-06-15T20:01:01.8338467Z","PerformanceDuration":"503","Latency":"31"}	0
202	53	Succeeded	\N	2018-06-15 20:01:01.849446	{"SucceededAt":"2018-06-15T20:01:01.8338467Z","PerformanceDuration":"444","Latency":"62"}	0
203	54	Enqueued	Triggered by recurring job scheduler	2018-06-15 21:00:00.593432	{"EnqueuedAt":"2018-06-15T21:00:00.4842323Z","Queue":"default"}	0
204	54	Processing	\N	2018-06-15 21:00:00.640232	{"StartedAt":"2018-06-15T21:00:00.6246326Z","ServerId":"0878090-win-201:84f60f02-4197-4385-ba6d-1acd45c43597","WorkerId":"0b4f20d3-ee11-400b-b76e-c1141dd8d0db"}	0
205	54	Succeeded	\N	2018-06-15 21:00:00.827432	{"SucceededAt":"2018-06-15T21:00:00.7962329Z","PerformanceDuration":"144","Latency":"124"}	0
206	55	Enqueued	Triggered by recurring job scheduler	2018-06-15 22:00:00.252955	{"EnqueuedAt":"2018-06-15T22:00:00.2373550Z","Queue":"default"}	0
207	55	Processing	\N	2018-06-15 22:00:00.268555	{"StartedAt":"2018-06-15T22:00:00.2529550Z","ServerId":"0878090-win-201:84f60f02-4197-4385-ba6d-1acd45c43597","WorkerId":"3d902dcd-fc30-435b-8e57-4b878f895c09"}	0
208	55	Succeeded	\N	2018-06-15 22:00:00.315355	{"SucceededAt":"2018-06-15T22:00:00.3153551Z","PerformanceDuration":"41","Latency":"31"}	0
\.


--
-- TOC entry 2149 (class 0 OID 0)
-- Dependencies: 181
-- Name: state_id_seq; Type: SEQUENCE SET; Schema: hangfire; Owner: hangfire
--

SELECT pg_catalog.setval('hangfire.state_id_seq', 211, true);


-- Completed on 2018-06-16 16:16:17

--
-- PostgreSQL database dump complete
--

