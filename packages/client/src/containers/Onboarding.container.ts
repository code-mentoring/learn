import { useMutation } from '@apollo/react-hooks';
import { Mutation, Path, UserPreferencesInput } from '@codement/api';
import { LocalStorage } from '@codement/ui/lib/localStorage';
import gql from 'graphql-tag';
import { useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';

import { Me } from '@codement/ui/lib/containers/Me.container';
import { steps } from '../pages/Onboarding/steps';

export interface FormValues {
  codingAbility?: number;
  why?: string;
  paths?: Path[],
  practiceGoal?: number
}


// Submit both user prefs and join paths at once
const submitQuery = gql`
mutation updatePreferences(
  $preferences: UserPreferencesInput!,
  $paths: [String!]!
) {
  prefs: updatePreferences(preferences: $preferences) {
    id
    why
    practiceGoal
    codingAbility
  }
  paths: joinPaths(paths: $paths)
}`;


/**
 * Container for handling onboarding workflow
 */
export const Onboarding = createContainer(() => {

  const { refetch: getMe } = Me.useContainer();
  const [page, setPage] = useState(0);
  const step = useMemo(() => steps[page], [page]);
  const [values, setValues] = useState<FormValues>(LocalStorage.onboarding || {});
  // Don't redirect on last page when finished. Wait for user to click button
  const [hold, setHold] = useState(false);

  const [submit, { loading, data }] = useMutation<
    { prefs: Mutation['updatePreferences'], paths: Mutation['joinPaths'], },
    { preferences: UserPreferencesInput, paths: string[] }
  >(submitQuery);

  // Update a form value
  const setValue = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    setValues(cur => ({ ...cur, [k]: v }));
  };

  // Update local storage when values change
  useEffect(() => { LocalStorage.onboarding = values; }, [values]);

  // Check validity of each step
  const valid = useMemo(() => ([
    true,
    values.codingAbility !== undefined,
    Boolean(values.why),
    Boolean(values.paths?.length),
    Boolean(values.practiceGoal)
  ]), [values]);


  // Attempt to go to page. If it's the last one, submit
  const goTo = (p: number) => {
    if (p === 0) return setPage(0);
    // Submit on last page
    if (p === steps.length - 1) {
      const { paths, ...preferences } = values;
      submit({
        variables: {
          paths: paths!.map(p => p.id),
          preferences
        }
      });
    } else if (valid[p - 1]) setPage(p);
  };


  // Once submitted, clear LS and go to last page
  useEffect(() => {
    if (data?.paths && data?.prefs) {
      setHold(true);
      setPage(steps.length - 1);
      getMe();
      LocalStorage.onboarding = null;
    }
  }, [data]);


  return { page, valid, step, setValue, values, goTo, loading, hold };
});
