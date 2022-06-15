<template>
  <div id="main-content-wrapper">

    <section id="hero">
      <canvas id="mc-splash-canvas"></canvas>
      <div class="typography">
        <h1>
          <span class="span-word span-word-first">{{ $t('mc-headline-fragment-word-first') }}</span>
          <span class="span-word span-word-last">{{ $t('mc-headline-fragment-word-last') }}</span>
        </h1>
        <p class="large">{{ $t('mc-headline-paragraph') }}</p>
      </div>
    </section>

    <section id="features" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true">

      <section id="for-young-people" class="feature-section" data-focus-start="t-0vh" data-focus-end="b-100vh" data-focus-toggle="false">

        <div class="feature-heading typography">
          <h2 class="feature-heading-eyebrow visually-h5">For young people</h2>
          <h3 class="feature-heading-headline visually-h1">Find a mentor.</h3>
          <p class="feature-heading-copy large">Are you a young person looking for a mentor? Are you a parent, guardian, teacher, or caring adult who knows a young person who would benefit from having a mentor?</p>
          <p class="feature-heading-copy large">Having a mentor — online or in person — can help open the door to new possibilities. Get the support you need in achieving your academic, career or life goals.</p>
          <div class="feature-heading-cta">
            <button @click="findAMentor">{{ $t('find-a-mentor-button') }}</button>
          </div>
        </div>

        <div id="fyp-what-can-mentoring-do" class="feature-item feature-item-grid feature-item-grid-copy-left">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fyp-what-can-mentoring-do-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fyp-what-can-mentoring-do-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">What can mentoring do for you?</h2>
            <h3 class="feature-copy-headline visually-h2">Ignite your potential.</h3>
            <p>Set academic goals and get step by step guidance on how to achieve them.</p>
            <p>Make day to day healthy life choices, focusing on well-being & mental health, sports & activities, social & emotional skills and much more.</p>
            <p>Get advice on how to land your first job or further the possibilities for your education.</p>
            <a class="icon-link" @click="findAMentor">
              {{ $t('find-a-mentor-button') }}
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
        </div>

        <div id="fyp-time-commitment" class="feature-item feature-item-grid feature-item-grid-copy-right">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fyp-time-commitment-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fyp-time-commitment-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Worried about the time commitment?</h2>
            <h3 class="feature-copy-headline visually-h2">Find mentoring that fits your schedule.</h3>
            <p>Whether you want to meet with your mentor once a week or once a month, there are many different mentoring opportunities that fit your lifestyle and schedule.</p>
            <a class="icon-link" @click="findAMentor">
              {{ $t('find-a-mentor-button') }}
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
        </div>

        <div id="fyp-pandemic" class="feature-item feature-item-grid feature-item-grid-copy-left">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fyp-pandemic-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fyp-pandemic-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Looking for virtual opportunities?</h2>
            <h3 class="feature-copy-headline visually-h2">Access virtual programs that meet your needs.</h3>
            <p>There are many ways to connect virtually with mentors from across the country, with video calls, live chat, or SMS.</p>
            <a class="icon-link" @click="findAMentor">
              {{ $t('find-a-mentor-button') }}
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
        </div>

        <div class="feature-quotes">
          <div class="typography">
            <h2>Young adults just like you are benefiting from mentoring. Here is what they say!</h2>
          </div>
          <div class="quotes">
            <blockquote class="typography">
              <p>"My mentors helped guide me, they helped create this irreplaceable experience that is now the foundation to my career growth, and they also helped me paint this big picture in my life which to me I think is priceless. My mentors also helped change the way I carry myself."</p>
              <cite>
                <span class="cite-name">Ipellie Foo</span>
                <span class="cite-title">Youth Indigenous Leader</span>
              </cite>
            </blockquote>
            <blockquote class="typography">
              <p>"My mentor always told me to never let a good question go to waste. That notion really impacted me. My mentor also told me if you focus on problems, you will get problems, and if you focus on solutions, you will get solutions. This was a huge realization for me and it drove me to be more productive."</p>
              <cite>
                <span class="cite-name">Youth participant 2021</span>
                <span class="cite-title">Global Youth Town Hall</span>
              </cite>
            </blockquote>
          </div>
        </div>

        <div class="feature-cta">
          <div class="feature-cta-item">
            <div class="typography">
              <h2>Find a mentor today.</h2>
              <p class="large">Get started with Mentor Connector to get the support you need and open the door to new possibilities.</p>
            </div>
            <button @click="findAMentor">{{ $t('find-a-mentor-button') }}</button>
          </div>
          <div class="feature-cta-item">
            <div class="typography">
              <h3>Not ready to connect with a mentor yet? Join us at an event instead!</h3>
              <p>If you're 18 to 30 years old, join us at an upcoming Power of Mentoring event! These fireside chat mentoring events allow you to connect with volunteers and prospective employers. You can ask anything and work on networking, goal setting, and personal branding. Learn how to write the perfect resume, land your first job, or make a career change.</p>
              <a class="icon-link" href="https://www.mentoringcanada.ca/en/mentor-connector/powerofmentoring.ca">
                Attend a Power of Mentoring Event
                <span class="material-icons">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      <section id="for-volunteers" class="feature-section" data-focus-start="t-0vh" data-focus-end="b-100vh" data-focus-toggle="false">

        <div class="feature-heading typography">
          <h2 class="feature-heading-eyebrow visually-h5">For volunteers</h2>
          <h3 class="feature-heading-headline visually-h1">Become a mentor.</h3>
          <p class="feature-heading-copy large">You don't need any special skills to become a mentor. All you need is an open mind and an interest in making a difference in the life of a young person between the ages of 6 and 30.</p>
          <div class="feature-heading-cta">
            <button @click="becomeAMentor">{{ $t('become-a-mentor-button') }}</button>
          </div>
        </div>

        <div id="fv-make-a-difference" class="feature-item feature-item-grid feature-item-grid-copy-right">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fv-make-a-difference-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fv-make-a-difference-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Change someone's life trajectory.</h2>
            <h3 class="feature-copy-headline visually-h2">Support a young person's growth.</h3>
            <p>Over 15,000 young people are waiting for a mentor — someone just like you.</p>
            <p>The COVID-19 pandemic left many young people feeling alone and disconnected. Many are struggling to finish school and find jobs.</p>
            <a class="icon-link" @click="becomeAMentor">
              {{ $t('become-a-mentor-button') }}
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
        </div>

        <div id="fv-time-commitment" class="feature-item feature-item-grid feature-item-grid-copy-left">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fv-time-commitment-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fv-time-commitment-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Worried about the time commitment?</h2>
            <h3 class="feature-copy-headline visually-h2">Find opportunities that fit your schedule.</h3>
            <p>Whether you want to volunteer once a week or once a month, you can find mentorship opportunities that fit your schedule. </p>
            <a class="icon-link" @click="becomeAMentor">
              {{ $t('become-a-mentor-button') }}
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
        </div>

        <div id="fv-pandemic" class="feature-item feature-item-grid feature-item-grid-copy-right">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fv-pandemic-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fv-pandemic-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Offer mentorship through video calls and online messaging.</h2>
            <h3 class="feature-copy-headline visually-h2">Mentor a young person from a flexible, virtual setting.</h3>
            <p>Mentoring programs across Canada are connecting mentors and young people virtually through e-mentoring programs. In-person programs are also starting to re-open.</p>
            <p>Mentor Connector lets you explore all the available e-mentoring and in-person opportunities in your community.</p>
            <a class="icon-link" @click="becomeAMentor">
              {{ $t('become-a-mentor-button') }}
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
        </div>

        <div class="feature-cta">
          <div class="feature-cta-item">
            <div class="typography">
              <h2>Mentoring changes lives.</h2>
              <p class="large">If you've ever had a mentor — at work, at school, or in your life — then you know that mentoring can change lives. Many of us have had mentors — caring adults who have supported us in our lives or careers.</p>
            </div>
          </div>
          <div class="feature-cta-item">
            <div class="typography feature-stats">
              <h4>Young people who are mentored are:</h4>
              <div class="stats-wrapper">
                <div class="stat-block typography" data-focus-start="b-20vh">
                  <p class="stat">53%</p>
                  <p>more likely to report good or excellent mental health.</p>
                </div>
                <div class="stat-block typography" data-focus-start="b-20vh">
                  <p class="stat">2x</p>
                  <p>as likely to have completed high school.</p>
                </div>
                <div class="stat-block typography" data-focus-start="b-20vh">
                  <p class="stat">95%</p>
                  <p>more likely to have pursued further education after high school.</p>
                </div>
              </div>
            </div>
          </div>
          <button @click="becomeAMentor">{{ $t('become-a-mentor-button') }}</button>
        </div>

      </section>

      <section id="for-organizations" class="feature-section" data-focus-start="t-0vh" data-focus-end="b-100vh" data-focus-toggle="false">

        <div class="feature-heading typography">
          <h2 class="feature-heading-eyebrow visually-h5">For organizations</h2>
          <h3 class="feature-heading-headline visually-h1">Increase your organization's reach.</h3>
          <p class="feature-heading-copy large">Increase your program's reach. Mentor Connector is Canada's only national database for mentoring programs. It is a free engagement tool that helps you raise the profile of your mentoring programs to reach more volunteers and youth in your community and across Canada.</p>
          <div class="feature-heading-cta">
            <router-link :to="link('organizations/add')">
              <button>{{ $t('list-program-button') }}</button>
            </router-link>
          </div>
        </div>

        <div id="fo-step-1" class="feature-item feature-item-grid feature-item-grid-copy-left">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fo-step-1-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fo-step-1-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Step 1</h2>
            <h3 class="feature-copy-headline visually-h2">Get your organization listed.</h3>
            <p>If you are an organization offering a mentoring program, you can submit your organization and get listed in Mentor Connector.</p>
            <router-link :to="link('organizations/add')" class="icon-link">
              Get your organization listed
              <span class="material-icons">arrow_forward</span>
            </router-link>
          </div>
        </div>

        <div id="fo-step-2" class="feature-item feature-item-grid feature-item-grid-copy-right">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fo-step-2-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fo-step-2-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Step 2</h2>
            <h3 class="feature-copy-headline visually-h2">Get your program listed.</h3>
            <p>Once you have listed your organization, you will be invited to submit the various mentoring programs your organization offers for inclusion in Mentor Connector's publicly searchable database. If you offer a program that is not affiliated with a particular organization, not to worry, you will also have the opportunity to add your program to the Connector.</p>
            <router-link :to="link('programs/add/step/1')" class="icon-link">
              Get your program listed
              <span class="material-icons">arrow_forward</span>
            </router-link>
          </div>
        </div>

        <div id="fo-step-3" class="feature-item feature-item-grid feature-item-grid-copy-left">
          <div class="feature-item-image-lockup">
            <div class="feature-item-image img-1" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fo-step-3-1.jpg')"></div>
            <div class="feature-item-image img-2" data-focus-start="b-0vh" data-focus-end="b-100vh" data-focus-vars="true" style="background-image: url('/assets/home/fo-step-3-2.jpg')"></div>
          </div>
          <div class="feature-copy typography">
            <h2 class="feature-copy-eyebrow visually-h5">Step 3</h2>
            <h3 class="feature-copy-headline visually-h2">Connect with mentors and youth.</h3>
            <p>Anyone interested in mentorship can search for mentoring initiatives by postal code and program type to find and contact programs that interest them. You will be able to increase your program visibility and reach, manage your program listing, get real-time metrics on searches, and receive notifications from interested volunteers and youth.</p>
            <router-link :to="link('admin')" class="icon-link">
              Sign in to Mentor Connector
              <span class="material-icons">arrow_forward</span>
            </router-link>
          </div>
        </div>

        <div class="feature-cta">
          <div class="feature-cta-item">
            <div class="typography">
              <h2>Increase your organization's reach today.</h2>
              <p class="large">Get started with Mentor Connector to raise the profile of your mentoring programs and initiatives.</p>
            </div>
            <router-link :to="link('organizations/add')">
              <button>{{ $t('list-program-button') }}</button>
            </router-link>
          </div>
          <div class="feature-cta-item">
            <div class="typography">
              <h3>Need technical support?</h3>
              <p>Reach out to us or access our Mentor Connector User Guide by visiting our Support & Training Centre.</p>
              <a class="icon-link" href="https://support.mentoringcanada.ca/">
                Access the Support & Training Centre
                <span class="material-icons">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      <section id="extras">
        <div class="typography">
          <h4>Social media, resources, extras go here</h4>
        </div>
      </section>

      <nav id="section-nav" data-tabs>
        <div class="tab-list-scroll-container">
          <ul class="tab-list">
            <li data-tab-id="for-young-people" data-tab-index="0">For young people</li>
            <li data-tab-id="for-volunteers" data-tab-index="1">For volunteers</li>
            <li data-tab-id="for-organizations" data-tab-index="2">For organizations</li>
          </ul>
        </div>
      </nav>

    </section>



  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin";
import Home from "./Home";
import FeatureFlags from '../../FeatureFlags';

export default {
  mixins: [BaseMixin],

  async mounted() {
    await document.fonts.ready;
    this.home = new Home();
    this.ready();
  },

  destroyed() {
    this.home.destroy();
  },

  methods: {
    becomeAMentor() {
      if (FeatureFlags.NEW_RESULTS) {
        this.$router.push(this.link('become-a-mentor'));
      } else {
        this.$router.push(this.link('search'));
      }
    },

    findAMentor() {
      if (FeatureFlags.NEW_RESULTS) {
        this.$router.push(this.link('find-a-mentor'));
      } else {
        this.$router.push(this.link('search'));
      }
    }
  }
}
</script>
