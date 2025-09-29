type CommonBase = {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type User = CommonBase & {
	email: string;
	fullname: string;
	avatarUrl: string;
};
