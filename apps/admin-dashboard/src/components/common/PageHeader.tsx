interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

function PageHeader({
    title,
    description,
    children,
}: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 text-slate-500">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </div>
    );
}

export default PageHeader;