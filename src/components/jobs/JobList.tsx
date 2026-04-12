import JobCard from "./JobCard";

interface Job {
  id: string;
  title: string;
  description: string;
  sector: string;
  city: string;
  urgency: string | null;
  imageUrl?: string | null;
  createdAt: Date;
  expiresAt: Date | null;
  isFeatured?: boolean;
}

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Henüz ilan bulunamadı
        </h3>
        <p className="text-secondary">
          Filtreleri değiştirerek veya daha sonra tekrar bakarak ilanları
          görüntüleyebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} featured={job.isFeatured} />
      ))}
    </div>
  );
}
