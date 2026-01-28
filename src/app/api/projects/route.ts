import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/projects - List all projects (for a user)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // For now, get all projects (we'll add auth later)
    const projects = await prisma.project.findMany({
      where: userId ? { userId } : undefined,
      include: {
        files: {
          select: {
            id: true,
            name: true,
            language: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, userId, files } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Create or get a default user for demo purposes
    // (In production, this would come from authentication)
    let user;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }

    if (!user) {
      // Create a demo user if none exists
      user = await prisma.user.upsert({
        where: { email: "demo@codeforge.dev" },
        update: {},
        create: {
          email: "demo@codeforge.dev",
          name: "Demo User",
        },
      });
    }

    // Create project with files
    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: user.id,
        files: files
          ? {
              create: files.map(
                (file: { name: string; content: string; language: string }) => ({
                  name: file.name,
                  content: file.content,
                  language: file.language,
                })
              ),
            }
          : undefined,
      },
      include: {
        files: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
