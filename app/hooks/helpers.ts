'use client';

export const createCommonQueryBody = (
    pagination?: [number, number] | null,
    tags?: string[] | null,
    userId?: string | null,
    selectPublic?: boolean | null,
    include?: { [relation: string]: boolean }
) => ({
    ...(pagination && {
        skip: pagination[0],
        take: pagination[1]
    }),
    ...((tags?.length || userId || selectPublic) && {
        where: {
            ...(tags?.length && { tags: { hasEvery: tags } }),
            ...(userId && { owner_id: userId }),
            ...(selectPublic && { public_permissions: { has: 'get' } })
        }
    }),
    ...(include && { include })
});

export const createTagsSearchBody = (tags: string[]) => ({
    ...(tags.length && { where: { tags: { hasEvery: tags } }})
});
