import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'es-about',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 sm:py-20">
      <div class="container-xl">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
          About Elevate Skills
        </span>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
          Empowering Botswana with practical, flexible online skills learning
        </h1>
        <p class="mt-4 text-brand-100 text-lg max-w-2xl leading-relaxed">
          Elevate Skills is designed to help people and organisations build
          the skills they need to grow — in a flexible, modern, and
          accessible way.
        </p>
      </div>
    </section>

    <section class="section bg-brand-50">
      <div class="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span class="chip">Our Mission</span>
          <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Skills that translate into real outcomes
          </h2>
          <p class="mt-3 text-slate-700 leading-relaxed">
            We believe learning should be practical. Every course on Elevate
            Skills is designed to deliver real, usable skills — whether you
            are an individual building a career, an entrepreneur running a
            business, or an organisation investing in your people.
          </p>
          <p class="mt-3 text-slate-700 leading-relaxed">
            Our platform brings together Botswana-focused training content
            with a modern digital experience for a professional learner journey.
          </p>
        </div>
        <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1573167101669-476636b96cea?w=1200&auto=format&fit=crop&q=70"
            alt="African women collaborating in a professional meeting"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <section class="section bg-slate-50">
      <div class="container-xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="chip">What we stand for</span>
          <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Our values
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (value of values; track value.title) {
            <div class="card p-6 h-full">
              <div class="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                {{ value.initial }}
              </div>
              <h3 class="mt-4 text-lg font-bold text-slate-900">{{ value.title }}</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">{{ value.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-xl">
        <div class="rounded-3xl bg-brand-900 text-white p-10 sm:p-14 text-center">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to grow with us?
          </h2>
          <p class="mt-3 text-brand-100 max-w-2xl mx-auto">
            Explore our online courses or request a corporate training solution
            for your organisation.
          </p>
          <div class="mt-6 flex flex-wrap gap-3 justify-center">
            <a routerLink="/courses" class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50">
              Browse Courses
            </a>
            <a routerLink="/contact" class="btn-outline-white">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  readonly values = [
    {
      initial: 'P',
      title: 'Practical',
      description:
        'Every course focuses on applied skills and real workplace outcomes, not just theory.'
    },
    {
      initial: 'F',
      title: 'Flexible',
      description:
        'Self-paced online learning that fits around real work and personal schedules.'
    },
    {
      initial: 'L',
      title: 'Local',
      description:
        'Botswana-based team with local context, supporting individuals and organisations.'
    }
  ];
}
