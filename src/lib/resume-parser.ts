import type {
	ResumeAST,
	ResumeCertification,
	ResumeEducation,
	ResumeExperience,
	ResumeProject,
	ResumeSkill,
} from "@/types/resume";

/**
 * Parse markdown into a resume AST
 *
 * Expected markdown format:
 * # Name
 * Title | email@example.com | 555-1234 | linkedin.com/in/name
 *
 * ## Summary
 * Your summary here
 *
 * ## Experience
 * ### Senior Developer | Company Name | City, State | Jan 2020 - Present
 * - Responsibility 1
 * - Responsibility 2
 *
 * ## Education
 * ### Bachelor's in Computer Science | University Name | City | May 2020
 * GPA: 3.8
 *
 * ## Skills
 * **Languages**: JavaScript, TypeScript, Python
 * **Frameworks**: React, Node.js
 */
export function parseResumeMarkdown(markdown: string): ResumeAST {
	const lines = markdown.split("\n");
	const resume: ResumeAST = {
		header: {
			name: "",
			contact: {},
		},
	};

	let i = 0;

	// Parse header (name and contact info)
	while (i < lines.length) {
		const line = lines[i]?.trim();

		if (line?.startsWith("# ")) {
			resume.header.name = line.replace(/^# /, "").trim();
			i++;
			break;
		}
		i++;
	}

	// Parse contact info (next non-empty line after name)
	if (i < lines.length) {
		const contactLine = lines[i]?.trim();
		if (contactLine && !contactLine.startsWith("#")) {
			const parts = contactLine.split("|").map((p) => p.trim());

			parts.forEach((part) => {
				if (part.includes("@")) {
					resume.header.contact.email = part;
				} else if (part.match(/\d{3}-\d{3}-\d{4}/) || part.match(/\(\d{3}\)/)) {
					resume.header.contact.phone = part;
				} else if (part.match(/https?:\/\/(linkedin|github|.*\.com)/)) {
					if (part.includes("linkedin")) {
						resume.header.contact.linkedin = part;
					} else if (part.includes("github")) {
						resume.header.contact.github = part;
					} else {
						resume.header.contact.website = part;
					}
				} else {
					resume.header.contact.location = part;
				}
			});
			i++;
		}
	}

	// Skip empty lines
	while (i < lines.length && !lines[i]?.trim()) {
		i++;
	}

	// Parse sections
	while (i < lines.length) {
		const line = lines[i]?.trim();

		if (line?.startsWith("## ")) {
			const sectionTitle = line.replace(/^## /, "").trim().toLowerCase();

			if (sectionTitle === "summary" || sectionTitle === "objective") {
				i++;
				const summary = [];
				while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
					if (lines[i]?.trim() && !lines[i]?.trim().startsWith("#")) {
						summary.push(lines[i]?.trim() || "");
					}
					i++;
				}
				resume.summary = summary.join(" ");
			} else if (
				sectionTitle === "experience" ||
				sectionTitle === "work experience"
			) {
				resume.experience = parseExperienceSection(lines, i + 1);
				i = findNextSection(lines, i + 1);
			} else if (sectionTitle === "education") {
				resume.education = parseEducationSection(lines, i + 1);
				i = findNextSection(lines, i + 1);
			} else if (sectionTitle === "skills") {
				resume.skills = parseSkillsSection(lines, i + 1);
				i = findNextSection(lines, i + 1);
			} else if (sectionTitle === "certifications") {
				resume.certifications = parseCertificationsSection(lines, i + 1);
				i = findNextSection(lines, i + 1);
			} else if (sectionTitle === "projects" || sectionTitle === "portfolio") {
				resume.projects = parseProjectsSection(lines, i + 1);
				i = findNextSection(lines, i + 1);
			} else {
				// Custom section
				i++;
				const content = [];
				while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
					if (lines[i]?.trim()) {
						content.push(lines[i]?.trim() || "");
					}
					i++;
				}
				if (!resume.custom) resume.custom = [];
				resume.custom.push({
					title: (line || "").replace(/^## /, "").trim(),
					content: content.join("\n"),
				});
			}
		} else {
			i++;
		}
	}

	return resume;
}

function parseExperienceSection(
	lines: string[],
	startIndex: number,
): ResumeExperience[] {
	const experiences: ResumeExperience[] = [];
	let i = startIndex;

	while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
		const line = lines[i]?.trim();

		if (line?.startsWith("### ")) {
			const headerLine = (line || "").replace(/^### /, "").trim();
			const parts = headerLine.split("|").map((p) => p.trim());

			let title = "";
			let company = "";
			let location = "";
			let dates = "";

			// Parse title and company
			if (parts[0]) {
				const [titlePart, companyPart] = parts[0].split(" at ");
				title = titlePart?.trim() || parts[0];
				company = companyPart?.trim() || parts[1] || "";
			}

			// Parse remaining parts
			for (let j = 1; j < parts.length; j++) {
				if (
					parts[j]?.match(
						/\d{3,4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|-|Present/i,
					)
				) {
					dates = parts[j] || "";
				} else {
					location = parts[j] || "";
				}
			}

			const [startDate, endDate] = parseDateRange(dates);

			const experience: ResumeExperience = {
				title,
				company,
				location,
				startDate,
				endDate,
				highlights: [],
			};

			i++;

			// Parse bullets
			while (i < lines.length && lines[i]?.trim().startsWith("-")) {
				const bulletText = lines[i]?.trim().replace(/^-\s*/, "") || "";
				experience.highlights?.push({ text: bulletText });
				i++;
			}

			experiences.push(experience);
		} else {
			i++;
		}
	}

	return experiences;
}

function parseEducationSection(
	lines: string[],
	startIndex: number,
): ResumeEducation[] {
	const education: ResumeEducation[] = [];
	let i = startIndex;

	while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
		const line = lines[i]?.trim();

		if (line?.startsWith("### ")) {
			const headerLine = (line || "").replace(/^### /, "").trim();
			const parts = headerLine.split("|").map((p) => p.trim());

			const degree = parts[0] || "";
			const institution = parts[1] || "";
			const location = parts[2] || "";
			const graduationDate = parts[3] || "";

			const edu: ResumeEducation = {
				degree,
				institution,
				location,
				graduationDate,
				highlights: [],
			};

			i++;

			// Parse additional info (GPA, coursework, etc.)
			while (
				i < lines.length &&
				lines[i]?.trim() &&
				!lines[i]?.trim().startsWith("###")
			) {
				const infoLine = lines[i]?.trim() || "";
				if (infoLine.startsWith("- ")) {
					edu.highlights?.push(infoLine.replace(/^- /, ""));
				} else if (infoLine.toLowerCase().includes("gpa")) {
					const gpaMatch = infoLine.match(/[\d.]+/);
					if (gpaMatch) edu.gpa = gpaMatch[0];
				}
				i++;
			}

			education.push(edu);
		} else {
			i++;
		}
	}

	return education;
}

function parseSkillsSection(
	lines: string[],
	startIndex: number,
): ResumeSkill[] {
	const skills: ResumeSkill[] = [];
	let i = startIndex;

	while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
		const line = lines[i]?.trim();

		if (line?.startsWith("**") && line.includes(":")) {
			const [category, items] = line.split(":");
			const categoryName = (category || "").replace(/\*\*/g, "").trim();
			const skillItems = (items || "")
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s);

			skills.push({
				category: categoryName,
				items: skillItems,
			});
			i++;
		} else {
			i++;
		}
	}

	return skills;
}

function parseCertificationsSection(
	lines: string[],
	startIndex: number,
): ResumeCertification[] {
	const certs: ResumeCertification[] = [];
	let i = startIndex;

	while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
		const line = lines[i]?.trim();

		if (line?.startsWith("- ")) {
			const certLine = (line || "").replace(/^- /, "");
			const parts = certLine.split("|").map((p) => p.trim());

			certs.push({
				name: parts[0] || "",
				issuer: parts[1] || "",
				date: parts[2] || "",
			});
			i++;
		} else {
			i++;
		}
	}

	return certs;
}

function parseProjectsSection(
	lines: string[],
	startIndex: number,
): ResumeProject[] {
	const projects: ResumeProject[] = [];
	let i = startIndex;

	while (i < lines.length && !lines[i]?.trim().startsWith("## ")) {
		const line = lines[i]?.trim();

		if (line?.startsWith("### ")) {
			const projectName = (line || "").replace(/^### /, "").trim();
			let description = "";
			let technologies: string[] = [];

			i++;

			while (
				i < lines.length &&
				lines[i]?.trim() &&
				!lines[i]?.trim().startsWith("###")
			) {
				const contentLine = lines[i]?.trim() || "";
				if (contentLine.startsWith("- ")) {
					description = contentLine.replace(/^- /, "");
				} else if (contentLine.startsWith("**Tech")) {
					technologies = contentLine
						.replace(/\*\*.*?:\*\*/g, "")
						.split(",")
						.map((t) => t.trim());
				}
				i++;
			}

			projects.push({
				name: projectName,
				description,
				technologies,
			});
		} else {
			i++;
		}
	}

	return projects;
}

function parseDateRange(dateStr: string): [string, string | undefined] {
	const parts = dateStr.split("-").map((p) => p.trim());
	return [parts[0] || "", parts[1] === "Present" ? "Present" : parts[1]];
}

function findNextSection(lines: string[], startIndex: number): number {
	for (let i = startIndex; i < lines.length; i++) {
		if (lines[i]?.trim().startsWith("## ")) {
			return i;
		}
	}
	return lines.length;
}
