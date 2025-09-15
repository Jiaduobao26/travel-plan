-- 会在容器第一次启动时自动执行
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
-- 如果将来需要向量搜索，可以启用 pgvector（需用带 pgvector 的镜像或在容器里编译安装）
-- CREATE EXTENSION IF NOT EXISTS vector;
