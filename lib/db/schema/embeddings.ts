import {generateId} from 'ai';
import { index, pgTable, text, varchar, vector } from 'drizzle-orm/pg-core';
import { resources } from './resources';

export const embeddings = pgTable('embeddings',{
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => generateId()),
  resourceId: varchar('resource_id', { length: 191 }).references(
    () => resources.id,
    { onDelete: 'cascade' },
  ),
  content: text().notNull(), //text chunk
  embeddings: vector('embeddings', { dimensions: 1536 }).notNull(),
  },
  table => [
    index('embeddingIndex').using(
      'hnsw', // similarity search
      table.embeddings.op('vector_cosine_ops'),
    ),
  ]
);