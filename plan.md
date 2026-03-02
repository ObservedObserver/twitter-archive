# Xarchive 冷启动内容计划（Ahrefs 深度调研版）

## 进度更新（2026-03-02）
- [x] Week 1（#1 #4 #5 #6 #9）已上线。
- [x] Week 2（#2 #3 #7 #8 #12）已上线（新增 5 篇指南页）。
- [ ] Week 3（#10 #11 #13 #14 #15）待执行。
- [ ] Week 4（#16 #17 #18 #19 #20）待执行。

## 0) 调研快照（2026-02-25）
- 数据来源：Ahrefs MCP（`keywords-explorer-*`、`serp-overview`、`site-explorer-*`）。
- 当前站点基线：`xarchive.net` 在 US 库中 `org_keywords=0`、`org_traffic=0`（冷启动状态）。
- 竞品信号：
  - `cache.digitaldigging.org`：US `org_traffic=4663`，核心流量来自“deleted tweets”词簇（低 KD）。
  - `waybacktweets.streamlit.app`：US `org_traffic=1476`，单页吃下“wayback machine twitter / twitter archive”大量流量。
  - `tweetdelete.net`：US `org_traffic=17988`，其资源页模型验证了“用例/问题型内容 -> 工具转化”路径。
- 结论：冷启动阶段不要先死磕头部词，优先拿“删除推文检索 + Wayback 用法 + CDX 开发者”长尾。

## 1) 选词策略（可执行）
- 先做 20 个长尾页面，不先打 `twitter archive`（US Vol 3400, KD 40）。
- 优先规则：
  - 第一优先：`KD <= 10` 且 `Volume >= 30`。
  - 第二优先：`KD <= 35` 但和工具强相关（用于搭建 topical authority）。
  - 低量词（Vol 0~20）只在“开发者/CDX”中保留，作为权威补位页。
- 页面都必须明确声明：数据来自 Internet Archive CDX 索引（`https://web.archive.org/cdx/search/cdx`）。

## 2) 你给的 5 组词如何落地
| 你给的方向 | Ahrefs 可执行主词 | 处理方式 |
|---|---|---|
| wayback machine twitter search | `wayback machine twitter search` (Vol 10) | 做专页，但同时从高量页内链导流。 |
| archived tweets viewer | `archived tweets` (Vol 100, KD 4) + 次词 `twitter archive viewer` (Vol 100, KD 34) | 页面主词用 `archived tweets`，标题含 viewer。 |
| twitter cdx api search / cdx query twitter | `wayback machine cdx api` (Vol 10) + `wayback machine api` (Vol 150, KD 30) | 做开发者页，主打“字段解释 + 示例查询 + 导出格式”。 |
| find deleted tweets wayback | `find deleted tweets` (Vol 400, KD 2) + `wayback machine deleted tweets` (Vol 150, KD 6) | 拆成 2 页：通用检索页 + Wayback 专页。 |
| twitter profile archived snapshots | `wayback machine twitter profile` (Vol 10) + `wayback machine twitter accounts` (Vol 60, KD 10) | 用 profile/account 双词布局 1 页。 |

## 3) 20 个优先页面清单（先发这 20 个）
> 每页都加主 CTA：`Open Xarchive Tool`；次 CTA：`Export JSON/CSV/HTML`；并加入 CDX 数据来源声明块。

| # | 建议 URL | 主关键词 | US Vol | KD | 页面类型 |
|---|---|---:|---:|---:|---|
| 1 | `/guides/how-to-see-deleted-tweets` | how to see deleted tweets | 800 | 1 | 教程页 |
| 2 | `/guides/see-deleted-tweets` | see deleted tweets | 500 | 2 | 工具导向页 |
| 3 | `/guides/view-deleted-tweets` | view deleted tweets | 450 | 3 | 工具导向页 |
| 4 | `/guides/find-deleted-tweets` | find deleted tweets | 400 | 2 | 工具导向页 |
| 5 | `/guides/how-to-find-deleted-tweets` | how to find deleted tweets | 300 | 1 | 教程页 |
| 6 | `/guides/twitter-archive-deleted-tweets` | twitter archive deleted tweets | 200 | 2 | 教程页 |
| 7 | `/guides/wayback-machine-deleted-tweets` | wayback machine deleted tweets | 150 | 6 | 教程页 |
| 8 | `/guides/twitter-archive-deleted-account` | twitter archive deleted account | 100 | 0 | 用例页 |
| 9 | `/guides/archived-tweets-viewer` | archived tweets | 100 | 4 | 工具导向页 |
| 10 | `/guides/find-deleted-twitter-posts` | find deleted twitter posts | 60 | 3 | 教程页 |
| 11 | `/guides/wayback-machine-twitter-accounts` | wayback machine twitter accounts | 60 | 10 | 用例页 |
| 12 | `/guides/search-deleted-tweets` | search deleted tweets | 40 | 0 | 工具导向页 |
| 13 | `/guides/archived-twitter-posts` | archived twitter posts | 40 | 3 | 教程页 |
| 14 | `/guides/how-to-use-wayback-machine-for-twitter` | how to use wayback machine for twitter | 40 | 10 | 教程页 |
| 15 | `/use-cases/journalists-verify-deleted-statements` | how to find deleted tweets from someone else | 30 | 1 | 用例落地页 |
| 16 | `/use-cases/osint-search-archived-tweets-by-date-range` | find deleted tweets by user | 40 | n/a | 用例落地页 |
| 17 | `/guides/wayback-machine-twitter-search` | wayback machine twitter search | 10 | n/a | 教程页 |
| 18 | `/guides/wayback-machine-twitter-profile-snapshots` | wayback machine twitter profile | 10 | n/a | 用例页 |
| 19 | `/developers/wayback-machine-api` | wayback machine api | 150 | 30 | 开发者页 |
| 20 | `/developers/wayback-machine-cdx-api` | wayback machine cdx api | 10 | n/a | 开发者页 |

## 4) 页面结构模板（避免“泛科普”，直接导流工具）

### A. 用例落地页模板（Journalists / OSINT）
1. 明确场景标题（如：`Journalists: verify deleted statements with Wayback snapshots`）。
2. 30 秒上手流程（用户名、时间范围、导出）。
3. 真实查询示例（含截图/示例表格）。
4. “数据来源与局限”模块：明确来自 Internet Archive CDX 索引。
5. CTA：`Run this search in Xarchive`（跳转工具）。

### B. 教程页模板（How-to）
1. 问题直答（前 120 字给结论）。
2. 步骤化指引（3~7 步）。
3. 常见失败场景（抓不到、时间段为空、账号删除）。
4. FAQ（带结构化数据）。
5. CTA：打开工具 + 导出结果。

### C. 开发者页模板（CDX/API）
1. CDX 字段速查表（`urlkey,timestamp,original,mimetype,statuscode,digest,length`）。
2. 示例查询（按用户名、日期范围、状态码筛选）。
3. 导出格式说明（JSON/CSV/HTML 对应使用场景）。
4. 速测按钮：一键复制 query + 打开工具。

## 5) 内链与信息架构
- 核心 Hub：
  - `/guides/deleted-tweets`（聚合 #1-#13）
  - `/guides/wayback-twitter`（聚合 #11/#14/#17/#18）
  - `/developers/twitter-cdx`（聚合 #19/#20）
- 内链规则：
  - 每篇至少 3 条横向内链 + 1 条回工具页（`/`）。
  - 每篇正文中至少 1 次出现“Internet Archive CDX”并链接官方文档。

## 6) 4 周发布节奏
- Week 1：发布 #1 #4 #5 #6 #9（先吃高量低 KD）。
- Week 2：发布 #2 #3 #7 #8 #12。
- Week 3：发布 #10 #11 #13 #14 #15。
- Week 4：发布 #16 #17 #18 #19 #20。

## 7) KPI 与验收
- 基线（2026-02-25）：US 自然词 0、自然流量 0。
- 30 天目标：
  - 新增已收录页面 >= 12。
  - 长尾词进入 Top50 >= 20。
  - Organic sessions >= 100。
- 60 天目标：
  - 20 页全部收录。
  - Top20 关键词 >= 15。
  - Organic sessions >= 400。
  - 来自内容页到工具页点击率（CTR）>= 12%。

## 8) 执行注意事项
- 避免关键词自相残杀：同义词页必须差异化场景（own tweets / others / deleted account / profile snapshots）。
- 头部词 (`twitter archive`, `twitter archive search`) 暂时只作为二级词，不作为首批主攻页。
- 每页都要放“权威背书模块”：`Data source: Internet Archive CDX index`，提升信任与转化。
