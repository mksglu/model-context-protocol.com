import { getDefaultDate } from '../utils/date';

export async function getLastUpdatedAt(supabase: any): Promise<string> {
	console.log('\n=== 📅 DATABASE DATE CHECK ===');
	try {
		console.log('🔍 Checking dates of last added and updated repos...');

		// 1. First check the date of the last inserted repository
		console.log('\n📥 Querying last inserted repo date...');
		const { data: lastInserted, error: lastInsertedError } = await supabase
			.from('github_repos')
			.select('inserted_at')
			.order('inserted_at', { ascending: false })
			.limit(1);

		if (lastInsertedError) {
			console.error('❌ Could not get last inserted repo date:', lastInsertedError);
		} else {
			console.log(`✅ Last inserted repo date: ${lastInserted?.[0]?.inserted_at || 'No records found'}`);
		}

		// 2. Check the date of the last updated repository
		console.log('\n📤 Querying last updated repo date...');
		const { data: lastUpdated, error: lastUpdatedError } = await supabase
			.from('github_repos')
			.select('updated_at')
			.order('updated_at', { ascending: false })
			.limit(1);

		if (lastUpdatedError) {
			console.error('❌ Could not get last updated repo date:', lastUpdatedError);
		} else {
			console.log(`✅ Last updated repo date: ${lastUpdated?.[0]?.updated_at || 'No records found'}`);
		}

		if (lastInsertedError && lastUpdatedError) {
			console.error('\n❌ Error in date queries:');
			console.error('   - Insert error:', lastInsertedError);
			console.error('   - Update error:', lastUpdatedError);
			console.log('⚠️ Using default date: 90 days ago');
			return getDefaultDate(90);
		}

		// Get dates from both queries and use the most recent
		let lastDate: Date | null = null;

		if (lastInserted && lastInserted.length > 0) {
			lastDate = new Date(lastInserted[0].inserted_at);
			console.log('\n📊 Last insert date:', lastDate.toLocaleString('en-US'));
		}

		if (lastUpdated && lastUpdated.length > 0) {
			const updatedDate = new Date(lastUpdated[0].updated_at);
			console.log('📊 Last update date:', updatedDate.toLocaleString('en-US'));
			if (!lastDate || updatedDate > lastDate) {
				lastDate = updatedDate;
			}
		}

		if (!lastDate) {
			console.log('\n⚠️ No date found, using default date: 90 days ago');
			return getDefaultDate(90);
		}

		// Go back 7 days from the last date
		lastDate.setDate(lastDate.getDate() - 7);
		console.log('\n✨ Start date to be used:', lastDate.toLocaleString('en-US'));
		console.log('=================================\n');

		return lastDate.toISOString();
	} catch (error) {
		console.error('\n❌ UNEXPECTED ERROR:');
		console.error('   Error details:', error);
		console.log('⚠️ Using default date: 90 days ago');
		return getDefaultDate(90);
	}
}
